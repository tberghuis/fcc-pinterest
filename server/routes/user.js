const router = require("express").Router();

const User = require("../models/user");

router.get("/:userId", async function(req, res, next) {
  try {
    // console.log("get /user/:userId", req);
    let user = await User.findById(req.params.userId);
    // console.log("user", user);
    let { displayName, username } = user.twitter;
    res.json({ displayName, username });
  } catch (e) {
    errorHandler(res)(e);
  }
});

module.exports = router;

const errorHandler = res => err => {
  console.log("500 error", err);
  res.status(500).json(err);
};
