const { Estate, EstateAttributes } = require("../models");
const csv = require('csv-parser');
const fs = require('fs')

const createEstateAttributes = async () => {
  try {
    fs.createReadStream(__dirname + '/estate_indices.csv').pipe(csv())
    .on('data', async (row) => {
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
     const estate = await Estate.findOne({where: {
      id: row.id
     }});
     await estate.setAttribute(attributes);
    })
    .on('end', () => {
      console.log('Loaded attributes data.');  
    });
  } catch (err) {
    console.log(err.message);
  }
};

createEstateAttributes();

module.exports = createEstateAttributes;
