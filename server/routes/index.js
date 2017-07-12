const router = require("express").Router();

router.use("/auth", require("./auth"));
router.use("/pins", require("./pins"));
router.use("/user", require("./user"));

module.exports = router;
