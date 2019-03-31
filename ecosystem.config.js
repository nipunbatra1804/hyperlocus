module.exports = {
  apps: [{
    name: 'hyperlocus-server',
    script: './server/index.js',
    watch       : true,
    env: {
      "NODE_ENV": "development",
    },
    env_production : {
     "NODE_ENV": "production"
    }
  },
  {
    name       : "hyperlocus-client",
    script     : "./client/src/index.js",
    watch       : true,
    env: {
      "NODE_ENV": "development",
    },
    env_production : {
      "NODE_ENV": "production"
    }
  }]
}