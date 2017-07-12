const router = require("express").Router();
const passport = require("passport");

// send to twitter to do the authentication
router.get("/twitter", passport.authenticate("twitter", { scope: "email" }));

router.get(
  "/twitter/callback",
  passport.authenticate("twitter", {
    successRedirect: process.env.CLIENT_BASE_URI,
    failureRedirect: "/"
  })
);

router.get("/login", passport.isLoggedIn, function(req, res, next) {
  res.json({
    displayName: req.user.twitter.displayName,
    username: req.user.twitter.username,
    id: req.user.id
  });
});

router.get("/logout", function(req, res, next) {
  req.logout();
  res.json({});
});

module.exports = router;
