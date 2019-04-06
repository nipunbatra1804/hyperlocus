const { Estate } = require("../../models");

const createTowns = async () => {
  try {
    await Estate.create({ name: "ANG MOH KIO", type: "1-RM", medRent: 1700 });
    await Estate.create({ name: "CLEMENTI", type: "1-RM", medRent: 1900 });
    await Estate.create({ name: "BUONA VISTA", type: "1-RM", medRent: 2700 });
  } catch (err) {
    console.log(err.message);
  }
};

module.exports = createTowns;
