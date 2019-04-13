const express = require("express");
const { Estate } = require("../models");

const router = express.Router();

router
  .route("/")
  .post(async (req, res) => {
    // Request must contain a user query for recommendation.
    const { query } = req.body
    // If query has a place of interest do a postGIS query to get
    // nearest neighbors.
    if (query.placesOfInterest.length > 0) {
    
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
    return res.json({[]})
  });

module.exports = router;
