module.exports = (sequelize, type) => {
  const HomeType = sequelize.define(
    "hometype",
    {
      town: type.STRING,
      type: type.STRING,
      Rent: type.STRING
    },
    { timestamps: false }
  );

  HomeType.associate = models => {
    HomeType.belongsTo(models.Estate);
  };

  return HomeType;
};
