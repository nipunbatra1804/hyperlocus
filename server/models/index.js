const Sequelize = require("sequelize");
const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../config/config.js")[env];

console.log(config);

sequelize = new Sequelize(config);

const models = {
  Estate: sequelize.import("./Town.js"),
  EstateAttributes: sequelize.import("./Attributes.js"),
  Tag: sequelize.import("./Tag.js"),
  Place: sequelize.import("./Place.js"),
  User: sequelize.import("./User.js")
};

Object.keys(models).forEach(key => {
  if ("associate" in models[key]) {
    models[key].associate(models);
    models[key].associate(models);
  }
});

module.exports = {
  sequelize,
  ...models
};
