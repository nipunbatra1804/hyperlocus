const { Estate, EstateAttributes, HomeType } = require("../models");
const csv = require("csv-parser");
const fs = require("fs");
const Sequelize = require("sequelize");
const _ = require("lodash");
const createEstateAttributes = async () => {
  try {
    fs.createReadStream(__dirname + "/estate_indices.csv")
      .pipe(csv())
      .on("data", async row => {
        const attributes = await EstateAttributes.create({
          opennessIndex: row.openness,
          extroversionIndex: row.extroversion,
          conscientiousnessIndex: row.conscientiousness,
          agreeablenessIndex: row.agreeableness,
          neuroticismIndex: row.neuroticism,
          healthIndex: row.health,
          entertainmentIndex: row.entertainment,
          foodIndex: row.food,
          childIndex: row.childindex,
          oldAgeIndex: row.oldAge,
          greeneryIndex: row.greenery
        });
        const estate = await Estate.findOne({
          where: {
            id: row.id
          }
        });
        await estate.setAttribute(attributes);
      })
      .on("end", () => {
        console.log("Loaded attributes data.");
      });
  } catch (err) {
    console.log(err.message);
  }
};

const printMagicMethods = modelInstance => {
  console.log(Object.keys(modelInstance.__proto__));
};
const createHomeTypes = async () => {
  try {
    const Op = Sequelize.Op;
    fs.createReadStream(__dirname + "/median-rent-by-town.csv")
      .pipe(csv())
      .on("data", async row => {
        const homeType = await HomeType.create({
          town: row.town,
          type: row.roomType,
          rent: row.rent
        });
        const townName = _.startCase(homeType.town.toLowerCase());

        const estates = await Estate.findAll({
          where: {
            name: { [Op.like]: `%${townName}%` }
          }
        });
        if (estates && estates.length > 0) {
          //await estate.addHometype(homeType);
          await Promise.all(
            estates.map(async elem => {
              await elem.addHometype(homeType);
            })
          );
        }
      })
      .on("end", () => {
        console.log("Loaded attributes data.");
      });
  } catch (err) {
    console.log(err.message);
  }
};

module.exports = { createEstateAttributes, createHomeTypes };
