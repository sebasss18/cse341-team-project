const router = require("express").Router();
const passport = require("passport");

router.use("/", require("./swagger"));

router.get("/", (req, res) => {
  //#swagger.tags=['API Name']
  res.send("QuickBuy Marketplace API");
});

router.get("/status", (req, res) => {
  if (req.user) {
    res.send(`Logged in as ${req.user.displayName}`);
  } else {
    res.send("Logged Out");
  }
});

// Here you guys need to add your routes, from your collection
router.use("/movies", require("./movies"));
router.use("/games", require("./games"));

//Michael Bowman gun route
router.use('/guns', require('./guns'));


router.get("/login", passport.authenticate("github"));

router.get("/logout", function (req, res, next) {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});

module.exports = router;