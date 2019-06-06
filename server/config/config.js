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
    host: "hyperlocus.ctuxzjkhxcw0.ap-southeast-1.rds.amazonaws.com",
    port: 5432,
    username: "root",
    password: "hunter1804",
    database: "hyperlocus",
    maxConcurrentQueries: 100,
    dialectOptions: {
      ssl: "Amazon RDS"
    },
    pool: { maxConnections: 5, maxIdleTime: 30 },
    language: "en",
    ssl: true,
    dialect: "postgres",
    options: {}
  }
};
