module.exports = (sequelize, type) => {
  const Tag = sequelize.define(
    "tag",
    {
      id: { type: type.INTEGER, primaryKey: true, autoIncrement: true },
      name: { type: type.STRING }
    },
    { timestamps: false }
  );

  Tag.associate = models => {
    Tag.belongsToMany(models.Place, {
      through: "place_tag"
    });
  };
  return Tag;
};
