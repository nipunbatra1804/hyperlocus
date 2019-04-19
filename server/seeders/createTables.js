const { sequelize } = require("../../server/models/index");
const seedEstates = require("./seedEstates");
const {
  createEstateAttributes,
  createHomeTypes
} = require("./seedEstateAttributes");
const {
  seedClinics,
  seedSuperMarkets,
  seedFoodOptions,
  seedChildCare,
  seedPreSchools,
  seedGreenery
} = require("./seedPlaces");
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
sequelize.sync({ force: true }).then(async () => {
  await seedEstates();
  await createEstateAttributes();
  await createHomeTypes();
  await seedClinics();
  await seedSuperMarkets();
  await seedFoodOptions();
  await seedChildCare();
  await seedPreSchools();
  await seedGreenery();
});
