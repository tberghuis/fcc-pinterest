const router = require("express").Router();
const passport = require("passport");
const validUrl = require("valid-url");

const Pin = require("../models/pin");

const errorHandler = res => err => {
  console.log("500 error", err);
  res.status(500).json(err);
};

router.get("/", async function(req, res, next) {
  // get all pins....
  // query user_id for mypins
  // TODO pagination???
  try {
    // console.log("get /pins req.user", req.user);
    var pins = await Pin.find({}).populate("owner").exec();
    pins = pins.map(pin => {
      let { id, title, imageUrl } = pin;
      let liked = req.user && pin.likers.indexOf(req.user._id) > -1;
      return {
        id,
        title,
        imageUrl,
        twitter: pin.owner.twitter.username,
        liked,
        numLikes: pin.likers.length,
        owner: pin.owner.id
      };
    });
    res.json(pins);
  } catch (e) {
    errorHandler(res)(e);
  }
});

router.get("/mypins", passport.isLoggedIn, function(req, res, next) {
  // DRY seperate function
});

router.post("/create", passport.isLoggedIn, function(req, res, next) {
  let { title, imageUrl } = req.body;
  if (title === undefined || imageUrl === undefined) {
    console.log("bad req");
    res.status(400).send("bad request");
    return;
  }

  // validation
  let errors = {};
  title = title.trim();
  imageUrl = imageUrl.trim();
  // TODO test for bad chars and new lines and stuff, or research mongo validation
  if (title.length === 0) {
    errors.title = "Please enter a title";
  }
  if (imageUrl.length === 0) {
    errors.imageUrl = "Please enter an image URL";
  }
  if (!validUrl.isUri(imageUrl)) {
    errors.imageUrl = "Image URL is not valid";
  }
  // TODO check if image already exists
  if (!empty(errors)) {
    res.status(400).json({ errors });
    return;
  }

  // save and respond
  let newPin = { title, imageUrl, owner: req.user._id, likers: [] };
  new Pin(newPin)
    .save()
    .then(pin => {
      res.json(pin);
    })
    .catch(err => {
      // TODO
      console.log("err", err);
    });
});

// get is not convential REST
// but who cares for now
router.get("/like/:pinId", passport.isLoggedIn, function(req, res, next) {
  // console.log("req", req);
  // req.params.pinId
  Pin.findById(req.params.pinId)
    .then(pin => {
      console.log("pin", pin);
      pin.likers.addToSet(req.user);
      pin.save(); //assume that it works
      res.json({});
    })
    .catch(err => {
      console.log("err", err);
      res.status(400).send("bad request");
    });
});

router.get("/dislike/:pinId", passport.isLoggedIn, function(req, res, next) {
  Pin.findById(req.params.pinId)
    .then(pin => {
      pin.likers.pull(req.user);
      pin.save(); //assume that it works
      res.json({});
    })
    .catch(err => {
      console.log("err", err);
      res.status(400).send("bad request");
    });
});

router.get("/delete/:pinId", passport.isLoggedIn, async function(
  req,
  res,
  next
) {
  var ObjectId = require("mongoose").Types.ObjectId;
  try {
    await Pin.find({
      _id: new ObjectId(req.params.pinId),
      owner: req.user._id
    })
      .remove()
      .exec();
    res.json({});
  } catch (e) {
    errorHandler(res)(e);
  }
});

module.exports = router;

function empty(obj) {
  return Object.keys(obj).length === 0 && obj.constructor === Object;
}
