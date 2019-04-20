const express = require("express");
const math = require("mathjs");
const PersonalityInsightsV3 = require('watson-developer-cloud/personality-insights/v3');
const Twitter = require("twitter");
const { Estate, EstateAttributes } = require("../models");
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const router = express.Router();

const personality_insights = new PersonalityInsightsV3({
  iam_apikey: process.env.WATSON_API_KEY,
  version: '2017-10-13',
  url: 'https://gateway.watsonplatform.net/personality-insights/api/'
});

const twitter = new Twitter({
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token_key: process.env.TWITTER_ACCESS_TOKEN,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
});

/**
 * Expects a POST of the format:
 * {
 *  "budget": 2000,
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
 *  },
 *  "about" // enter some text
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
      nearestTowns = nearestTowns.filter(town => town.medRent <= query.budget);
    }
    var user_personality; 
    if (query.twitterPersonality) {
      const tweets = await fetchTweets(query.twitterPersonality);
      const tweetsPersonality = await fetchPersonality(tweets);
      user_personality = getUserPersonalityFromWatson(tweetsPersonality);
    }
    // If query includes user's personality, rank candidates by it.
    if (query.personality) {
      user_personality = query.personality;
    }
    if (user_personality) {
      // Handle personality preferences.
      nearestTowns.forEach(function(town) {
        addPersonalityScore(town, user_personality);
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
    if (nearestTowns.length > 3) {
      nearestTowns = nearestTowns.slice(0,3);
    }
    return res.json({"recommendations": nearestTowns});
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

function getUserPersonalityFromWatson(w) {
  const u = {};
  for (const trait of w.personality) {
    if (trait.trait_id == 'big5_openness') {
      u.openness = trait.raw_score;
    }
    if (trait.trait_id == 'big5_conscientiousness') {
      u.conscientiousness = trait.raw_score;
    }
    if (trait.trait_id == 'big5_extraversion') {
      u.extroversion = trait.raw_score;
    }
    if (trait.trait_id == 'big5_agreeableness') {
      u.agreeableness = trait.raw_score;
    }
    if (trait.trait_id == 'big5_neuroticism') {
      u.neuroticism = trait.raw_score;
    }
  }
  return u;
}

const fetchPersonality = (tweets) => {
  const content = {contentItems: tweets};
  return new Promise((resolve, reject) => {
     let params = {
      // Content items are tweets.
      content: JSON.stringify(content),
      consumption_preferences: false,
      raw_scores: true,
      headers: {
        'accept-language': 'en',
        'accept': 'application/json'
      }
    };
    personality_insights.profile(params, function (error, personalityProfile) {
      if (error && error.code == 400) {
        reject(Error("Ouch! You either do not have sufficient tweets, or your language is not supported. Sorry."));
      } else if (error) {
        reject(error);
      } else {
        resolve(personalityProfile);
      }
    });
  });
};

const fetchTweets = (username) => {
  return new Promise((resolve, reject) => {

    let params = {
      screen_name: username,
      count: 200,
      include_rts: false,
      trim_user: true,
      exclude_replies: true,
      tweet_mode: "extended"
    };

    let tweets = [];

    const fetchTweets = (error, newTweets) => {
      if (error) {
        reject(Error(error));
      }
      // Filter out tweets with only relevant info
      filteredTweets = newTweets.map(function (tweet) {
        return {
          id: tweet.id_str,
          language: tweet.lang,
          contenttype: 'text/plain',
          content: tweet.full_text.replace('[^(\\x20-\\x7F)]*', ''),
          created: Date.parse(tweet.created_at),
          reply: tweet.in_reply_to_screen_name != null
        };
      });
      // check if tweets are actually retrieved and get more tweets if yes.
      if (newTweets.length > 1 && tweets.length < 25) {
        tweets = tweets.concat(filteredTweets);
        params.max_id = tweets[tweets.length - 1].id - 1;
        twitter.get('statuses/user_timeline', params, fetchTweets);
      } else {
        // if there are no more tweets to retrieve, return already retrieved tweets
        resolve(tweets);
      }
    };
    twitter.get('statuses/user_timeline', params, fetchTweets);

  });
};


module.exports = router;
