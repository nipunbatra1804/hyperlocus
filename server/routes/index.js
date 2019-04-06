const express = require("express");
const router = express.Router();
const towns = require("./towns");
const places = require("./places");
const auth = require("./auth");

router.route("/").get((req, res) => {
  res.status(200);
  res.send("Hi");
});
router.use("/towns", towns);
router.use("/places", places);
router.use("/auth", auth);
module.exports = router;
