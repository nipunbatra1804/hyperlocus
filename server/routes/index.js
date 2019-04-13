const express = require("express");
const router = express.Router();
const towns = require("./towns");
const places = require("./places");
const auth = require("./auth");
const recommend = require("./recommend");

router.route("/").get((req, res) => {
  res.status(200);
  res.send("Hi");
});
router.use("/towns", towns);
router.use("/places", places);
router.use("/recommend", recommend);
router.use("/auth", auth);
module.exports = router;
