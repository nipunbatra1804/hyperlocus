const { sequelize } = require("../../server/models/index");
const seedEstates = require("./seedEstates");
const {
  seedClinics,
  seedSuperMarkets,
  seedFoodOptions
} = require("./seedPlaces");
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
sequelize.sync({ force: true }).then(async () => {
  await seedEstates();
  await seedClinics();
  await seedSuperMarkets();
  await seedFoodOptions();
});
