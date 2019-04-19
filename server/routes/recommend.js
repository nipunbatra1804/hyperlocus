const express = require("express");
const math = require("mathjs");
const { Estate, EstateAttributes } = require("../models");

const router = express.Router();

/**
 * Expects a POST of the format:
 * {
 *	"placesOfInterest": [
 *		{"coordinates": [1.297323, 103.802705]}
 *	],
 *	"preferences": {
 *		"health": 0.8,
 *		"entertainment": 0.2,
 *		"food": 0.5,
 *		"children": 0.8,
 *		"elderly": 0.7,
 *		"greenery": 0.2
 *	},
 *	"personality": {
 *		"openness": 0.1,
 * 		"extroversion": 0.2,
 *		"conscientiousness": 0.7,
 *		"agreeableness": 0.2,
 * 		"neuroticism": 0.4
 *  }
 * }
 */
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
      //
    }
    // If query includes user's personality, rank candidates by it.
    if (query.personality) {
      // Handle personality preferences.
      nearestTowns.forEach(function(town) {
        addPersonalityScore(town, query.personality);
      });
    }
    // If query includes user's preferences, rank candidates by it.
    if (query.preferences) {
      // Handle user preferences.
      nearestTowns.forEach(function(town) {
        addPreferenceScore(town, query.preferences);
      });
    }

    nearestTowns.forEach(getAndAddTotalScore);
    nearestTowns = nearestTowns.sort(function(a, b)
      { return b.score - a.score; } // Descending sort.
    );

    // Return best 3 candidate estates.
    return res.json({"recommendations": nearestTowns.slice(0,3)});
  });

function getNearestEstates(loc) {
  if (isNaN(loc.coordinates[0]) || isNaN(loc.coordinates[1])) {
    return [];
  }
  const order_clause =  'location <#> ST_SetSRID(ST_MakePoint(' + 
    loc.coordinates[1] + ', ' + loc.coordinates[0] + '), 4326)';
  return Estate.findAll({
  order: [sequelize.literal(order_clause)],
  limit: 8,
  include: [EstateAttributes]
  })
}

function getAndAddTotalScore(estate) {
  let totalScore = 0;
  if (estate.preferenceScore) {
    totalScore += estate.preferenceScore;
  }
  if (estate.personalityScore) {
    totalScore += estate.personalityScore;
  }
  estate["score"] = totalScore;
}

function addPreferenceScore(estate, userPreferences) {
  const estate_vector = getEstatePreferenceVector(estate.attribute);
  const user_vector = getUserPreferenceVector(userPreferences);
  estate['preferenceScore'] = math.dot(estate_vector, user_vector);
}

function addPersonalityScore(estate, userPersonality) {
  const estate_vector = getEstatePersonalityVector(estate.attribute);
  const user_vector = getUserPersonalityVector(userPersonality);
  estate['personalityScore'] = math.dot(estate_vector, user_vector);
}

function getEstatePreferenceVector(e) {
  return [
    e.healthIndex,
    e.entertainmentIndex,
    e.foodIndex,
    e.childIndex,
    e.oldAgeIndex,
    e.greeneryIndex
  ];
}

function getEstatePersonalityVector(e) {
  return [
    e.opennessIndex,
    e.extroversionIndex,
    e.conscientiousnessIndex,
    e.agreeablenessIndex,
    e.neuroticismIndex
  ];
}

function getUserPreferenceVector(u) {
  return [
    u.health, u.entertainment, u.food, u.children, u.elderly, u.greenery
  ]; 
}

function getUserPersonalityVector(u) {
  return [
    u.openness, u.extroversion, u.conscientiousness, u.agreeableness, u.neuroticism
  ];
}

module.exports = router;
