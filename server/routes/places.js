const express = require("express");
const router = express.Router();
//const Sequelize = require("");
const { Place, Tag, sequelize, Estate } = require("../models");
const SqOp = sequelize.Op;
const insertLocation = require("../helpers/updateLocation");
const verification = require("../middleware/verification");
router
  .route("/")
  .get(async (req, res) => {
    const { query } = req;
    let places;
    if (Object.entries(query).length === 0) {
      places = await Place.findAll({
        include: [Tag]
      });
    } else {
      const { name, tag, loc, distance, id } = query;
      if (name) {
        places = await Place.findAll({
          where: { name: name },
          include: [Tag]
        });
        return res.json(places);
      }
      if (tag) {
        places = await Place.findAll({
          include: [{ model: Tag, where: { name: tag } }]
        });
        return res.json(places);
      }
      if (loc) {
        places = await Place.findAll({
          where: sequelize.where(
            sequelize.fn(
              "ST_Distance_Sphere",
              sequelize.col("location"),
              sequelize.fn(
                "ST_SetSRID",
                sequelize.fn("ST_MakePoint", loc.coord[0], loc.coord[1]),
                4326
              )
            ),
            "<",
            distance
          )
        });
        return res.json(places);
      }
    }
    res.json(places);
  })
  .post(verification, async (req, res) => {
    try {
      console.log(req.body);
      const { place } = req.body;
      const { tags } = place;
      await insertLocation(place);

      const newFoodOption = await Place.create(place);
      if (tags) {
        let newTags = [];
        await Promise.all(
          tags.map(async tag => {
            let [t, created] = await Tag.findOrCreate({
              where: { name: tag }
            });
            newTags.push(t);
          })
        );
        await newFoodOption.addTags(newTags);
      }
      const retFoodOption = await Place.findOne({
        where: { id: newFoodOption.id },
        include: [Tag]
      });

      res.status(201).json(retFoodOption);
    } catch (err) {
      res.status(400).json(err.message);
    }
  });

router
  .route("/:id")
  .get(async (req, res) => {
    const { id } = req.params;
    try {
      const retFoodOption = await Place.findOne({
        where: { id: id },
        include: [Tag]
      });
      return res.status(200).json(retFoodOption);
    } catch (err) {
      return res.status(415).json("get request not in correct format");
    }
  })
  .patch(verification, async (req, res) => {
    try {
      const { tags } = req.body;
      console.log(req.body);
      const newObject = req.body;
      delete newObject.tags;
      delete newObject.location;
      if (newObject.address && newObject.postalCode) {
        await insertLocation(newObject);
      }

      let newTags = [];
      if (tags) {
        await Promise.all(
          tags.map(async tag => {
            if (tag) {
              let [t, created] = await Tag.findOrCreate({
                where: { name: tag }
              });
              newTags.push(t);
            }
          })
        );
      }
      const foodOption = await Place.findOne({ where: { id: req.params.id } });
      await foodOption.setTags(newTags);
      const result = await foodOption.update(newObject);

      return res.status(202).json(result);
    } catch (err) {
      return res
        .status(415)
        .json("patch request not in correct format" + err.message);
    }
  });

module.exports = router;
