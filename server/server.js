const { sequelize } = require("./models");
const createTowns = require("./tests/seed/seedTowns");
const createHealthOptions = require("./tests/seed/seedHealthOptions");
const createFoodOptions = require("./tests/seed/seedFoodOptions");
const createShopOptions = require("./tests/seed/seedShopOptions");
const seedNeighbourhoods = require("./tests/seed/seedNeighbourhoods");
const app = require("./app");
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const port = process.env.PORT;

sequelize.sync({ force: true }).then(async () => {
  await createFoodOptions();
  await createShopOptions();
  await seedNeighbourhoods();
  app.listen(port, () => {
    if (process.env.NODE_ENV === "production") {
      console.log(`Server is running on Heroku with port number ${port}`);
    } else {
      console.log(`Server is running on http://localhost:${port}`);
    }
  });
});
