module.exports = (sequelize, type) => {
  const Estate = sequelize.define(
    "estate",
    {
      id: { type: type.INTEGER, primaryKey: true},
      name: type.STRING,
      type: type.STRING,
      medRent: type.INTEGER,
      location: type.GEOMETRY()
    },
    { 
      timestamps: false,
      indexes: [
        {fields: ['location'], using: 'gist'}
      ],
    } 
  );

  Estate.associate = models => {
    Estate.hasOne(models.EstateAttributes);
  };

  return Estate;
};
