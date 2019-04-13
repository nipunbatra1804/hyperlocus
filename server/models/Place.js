module.exports = (sequelize, type) => {
  const Place = sequelize.define(
    "place",
    {
      id: { type: type.INTEGER, primaryKey: true, autoIncrement: true },
      category: { type: type.ENUM, values: ["health", "food", "retail"] },
      name: type.STRING,
      type: type.STRING,
      postalCode: type.INTEGER,
      address: type.STRING,
      openingTime: { type: type.TIME, allowNull: true },
      closingTime: { type: type.TIME, allowNull: true },
      location: type.GEOMETRY("POINT", 4326)
    },
    { timestamps: false }
  );

  Place.associate = models => {
    Place.belongsToMany(models.Tag, {
      through: "place_tag"
    });
  };
  return Place;
};
