module.exports = {
  development: {
    host: "hyperlocus.ctuxzjkhxcw0.ap-southeast-1.rds.amazonaws.com",
    port: 5432,
    username: "root",
    password: "hunter1804",
    database: "hyperlocus",
    maxConcurrentQueries: 100,
    dialectOptions: {
        ssl:'Amazon RDS'
    },
    pool: { maxConnections: 5, maxIdleTime: 30},
    language: 'en' ,
    ssl: true,
    dialect: "postgres",
    options: {
    }
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
        ssl:'Amazon RDS'
    },
    pool: { maxConnections: 5, maxIdleTime: 30},
    language: 'en' ,
    ssl: true,
    dialect: "postgres",
    options: {
    }
  }
};
