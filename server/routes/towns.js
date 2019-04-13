const express = require("express");
const { Estate } = require("../models");

const router = express.Router();

router
  .route("/")
  .get(async (req, res) => {
    const { location } = req.body;
    console.log(req.body);
    if (!location) {
      const towns = await Estate.findAll({});
      return res.json(towns);
    }
    const towns = await Estate.findAll({
      where: sequelize.fn(
        "ST_Within",
        sequelize.fn(
          "ST_SetSRID",
          sequelize.fn(
            "ST_MakePoint",
            location.coordinates[0],
            location.coordinates[1]
          ),
          4326
        ),
        sequelize.col("location")
      )
    });

    return res.json(towns);
  })
  .post(async (req, res) => {
    const { location } = req.body;
    console.log(req.body);
    if (!location) {
      const towns = await Estate.findAll({});
      return res.json(towns);
    }
    const towns = await Estate.findAll({
      where: sequelize.fn(
        "ST_Within",
        sequelize.fn(
          "ST_SetSRID",
          sequelize.fn(
            "ST_MakePoint",
            location.coordinates[0],
            location.coordinates[1]
          ),
          4326
        ),
        sequelize.col("location")
      )
    });

    return res.json(towns);
  });

module.exports = router;
