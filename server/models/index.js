const Sequelize = require("sequelize");
const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../config/config.js")[env];

try {
  if (env === "production") {
    sequelize = new Sequelize(config.url, config.options);
  } else if (env === "production_aws") {
    sequelize = new Sequelize(config);
  }
} catch {
  sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config.options
  );
}
const models = {
  Estate: sequelize.import("./Town.js"),
  EstateAttributes: sequelize.import("./Attributes.js"),
  Tag: sequelize.import("./Tag.js"),
  Place: sequelize.import("./Place.js"),
  User: sequelize.import("./User.js"),
  HomeType: sequelize.import("./HomeType.js")
};

Object.keys(models).forEach(key => {
  if ("associate" in models[key]) {
    models[key].associate(models);
  }
});

module.exports = {
  sequelize,
  ...models
};
