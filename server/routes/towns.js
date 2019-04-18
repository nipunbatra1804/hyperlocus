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

router.route("/:id").get(async (req, res) => {
  const { id } = req.params;
  try {
    const towns = await Estate.findAll({
      where: { id: id }
    });
    return res.status(200).json(towns);
  } catch (err) {
    return res.status(415).json("get request not in correct format");
  }
});

module.exports = router;
