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
    var nearestTowns;
    if (query.placesOfInterest && query.placesOfInterest.length > 0) {
      nearestTowns = await getNearestEstates(query.placesOfInterest[0]);
    } else {
      // Get towns nearest to the center of Singapore.
      nearestTowns = await getNearestEstates({
        coordinates: [1.2837751, 103.8484317]
      });
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
    return res.json({"recommendations": nearestTowns.slice(0,6)});
  });

function getNearestEstates(loc) {
  if (isNaN(loc.coordinates[0]) || isNaN(loc.coordinates[1])) {
    return [];
  }
  const order_clause =  'location <#> ST_SetSRID(ST_MakePoint(' + 
    loc.coordinates[1] + ', ' + loc.coordinates[0] + '), 4326)';
  return Estate.findAll({
  order: [sequelize.literal(order_clause)],
  limit: 7
  })
}

module.exports = router;
