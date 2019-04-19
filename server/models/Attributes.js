module.exports = (sequelize, type) => {
  const EstateAttributes = sequelize.define(
    "attributes",
    {
      opennessIndex: type.DOUBLE,
      extroversionIndex: type.DOUBLE,
      conscientiousnessIndex: type.DOUBLE,
      agreeablenessIndex: type.DOUBLE,
      neuroticismIndex: type.DOUBLE,
      healthIndex: type.DOUBLE,
      entertainmentIndex: type.DOUBLE,
      foodIndex: type.DOUBLE,
      childIndex: type.DOUBLE,
      oldAgeIndex: type.DOUBLE,
      greeneryIndex: type.DOUBLE
    },
    { timestamps: false }
  );

  EstateAttributes.associate = models => {
    EstateAttributes.belongsTo(models.Estate, { through: "estate_attr" });
  };

  return EstateAttributes;
};
