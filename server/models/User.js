module.exports = (sequelize, type) => {
  const User = sequelize.define(
    "user",
    {
      id: { type: type.INTEGER, primaryKey: true, autoIncrement: true },
      username: { type: type.STRING, unique: true, allowNull: false },
      userEmail: { type: type.STRING, unique: true, allowNull: false },
      password: { type: type.STRING, unique: false, allowNull: false },
      category: { type: type.ENUM, values: ["user", "agent", "admin"] }
    },
    { timestamps: false }
  );

  return User;
};
