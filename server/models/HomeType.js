module.exports = (sequelize, type) => {
  const HomeType = sequelize.define(
    "hometype",
    {
      id: { type: type.INTEGER, primaryKey: true, autoIncrement: true },
      town: type.STRING,
      type: type.STRING,
      rent: type.STRING
    },
    { timestamps: false }
  );

  HomeType.associate = models => {
    HomeType.belongsTo(models.Estate);
  };

  return HomeType;
};
