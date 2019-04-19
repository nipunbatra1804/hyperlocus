const express = require("express");
const { Estate } = require("../models");

const router = express.Router();

router
  .route("/")
  .post(async (req, res) => {
    // Request must contain a user query for recommendation.
    const query = req.body;
    if (!query) {
      res.status(400).send('Query information is required for recommendation.');
    }
    // If query has a place of interest do a postGIS query to get
    // nearest neighbors.
    if (query.placesOfInterest && query.placesOfInterest.length > 0) {
      const nearestTowns = await getNearestEstates(query.placesOfInterest[0]);
      return res.json(nearestTowns);
    }
    // If query has a budget, filter out things beyond budget.
    if (query.budget) {
    }
    // If query includes user's personality, rank candidates by it.
    if (query.personality) {
      // Handle personality preferences.
    }
    // If query includes user's preferences, rank candidates by it.
    if (query.preferences) {
      // Handle user preferences.
    }

    // Return best 3 candidate estates.
    return res.json({"recommendations": []});
  });

function getNearestEstates(loc) {
  return Estate.findAll({
  order: sequelize.fn("<#>",
    sequelize.fn(
      "ST_SetSRID",
      sequelize.fn(
        "ST_MakePoint",
        loc.coordinates[1],
        loc.coordinates[0]
      ), 
      4326
    ),
    sequelize.col("location")
  ),
  limit: 3
  })
}

module.exports = router;
