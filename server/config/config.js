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
  production_aws: {
    url: "hyperlocus.ctuxzjkhxcw0.ap-southeast-1.rds.amazonaws.com",
    dialect: "postgres",
    username: "root",
    password: "hunter1804",
    database: "hyperlocus",
    ssl: true
  },
  test: {
    username: "postgres",
    password: "",
    database: "hyperlocus-test",
    dialect: "postgres",
    options: {
      logging: false
    }
  },
  production: {
    url: process.env.DATABASE_URL,
    options: {
      dialect: "postgres"
    }
  },
  production_seed: {
    url: process.env.DATABASE_URL,
    dialect: "postgres",
    protocol: "postgres",
    ssl: true
  }
};
