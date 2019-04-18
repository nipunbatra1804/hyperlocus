const express = require("express");
const router = express.Router();
//const Sequelize = require("");
const { Place, Tag, sequelize, Estate } = require("../models");

router.route("/").get(async (req, res) => {
  console.log(req.body.id);
  const town = await Estate.findOne({
    where: { id: req.body.id }
  });
  console.log(town.location.type);
  //return res.sendStatus(200);
  if (!town) {
    return res.status(415).json({ err: "Unable to find estate" });
  }
  const places = await Place.findAll({
    where: sequelize.fn(
      "ST_Within",
      sequelize.fn(
        "ST_SetSRID",
        sequelize.fn("ST_GeomFromGeoJSON", JSON.stringify(town.location)),
        4326
      ),
      sequelize.col("location")
    )
  });
  return res.json(places);
});

router.route("/:id").get(async (req, res) => {
  console.log(req.params.id);
  const town = await Estate.findOne({
    where: { id: req.params.id }
  });
  console.log(town);
  if (!town) {
    return res.status(415).json({ err: "Unable to find estate" });
  }
  const places = await Place.findAll({
    where: sequelize.fn(
      "ST_Within",
      sequelize.fn(
        "ST_SetSRID",
        sequelize.fn("ST_GeomFromGeoJSON", JSON.stringify(town.location)),
        4326
      ),
      sequelize.col("location")
    )
  });
  return res.json(places);
});

module.exports = router;
