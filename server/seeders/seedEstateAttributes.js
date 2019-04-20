const { Estate, EstateAttributes, HomeType } = require("../models");
const csv = require("csv-parser");
const fs = require("fs");
const Sequelize = require("sequelize");
const _ = require("lodash");
const math = require("mathjs");

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
          await Promise.all(
            estates.map(async elem => {
              await elem.addHometype(homeType);
            })
          );
        }
      })
      .on("end", async () => {
        console.log("Loaded attributes data.");
      });
  } catch (err) {
    console.log(err.message);
  }
};

/** Call this after seeding home types. */
const updateMedRent = async () => {
  const allEstates = await Estate.findAll({
    include: [HomeType]
  });
  await Promise.all(
    allEstates.map(async estate => {
      const hometypes = estate.hometypes;
      if (hometypes.length > 0) {
        const median = math.median(hometypes.map(hometype => hometype.rent));
        console.log("Median rent for " + estate.now + " " + median); 
        await estate.update({medRent: median});
      }
    })
  );
};

module.exports = { createEstateAttributes, createHomeTypes, updateMedRent };
