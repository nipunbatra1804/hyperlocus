module.exports = {
  development: {
    username: "postgres",
    password: "",
    database: "hyperlocus-db",
    options: {
      dialect: "postgres",
      logging: false
    }
  },
  test: {
    username: "postgres",
    password: "",
    database: "hyperlocus-test",
    options: {
      dialect: "postgres",
      logging: false
    }
  },
  production: {
    url: process.env.DATABASE_URL,
    options: {
      dialect: "postgres"
    }
  }
};
