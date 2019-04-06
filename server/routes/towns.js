const express = require("express");
const { Estate } = require("../models");

const router = express.Router();

router.route("/").get(async (req, res) => {
  const { query } = req;
  const towns = await Estate.findAll({});
  return res.json(towns);
});

module.exports = router;
