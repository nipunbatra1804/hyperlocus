const express = require("express");
const router = express.Router();
const towns = require("./towns");
const places = require("./places");
const auth = require("./auth");
const estateInfo = require("./estateinfo");
const recommend = require("./recommend");
const cors = require("../middleware/cors");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");

router.use(cookieParser());
router.use(cors);
router.use(morgan("tiny"));
router.use(express.static("public"));
router.use(express.json());
router.route("/").get((req, res) => {
  res.status(200);
  res.send("Hi");
});
router.use("/towns", towns);
router.use("/places", places);
router.use("/recommend", recommend);
router.use("/auth", auth);
router.use("/estateinfo", estateInfo);
module.exports = router;
