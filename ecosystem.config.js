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
  }],
  deploy: {
    production: {
      user: 'ubuntu',
      host: 'ec2-52-74-35-245.ap-southeast-1.compute.amazonaws.com',
      key: './cs5224project.pem',
      ref: 'origin/master',
      repo: 'git@github.com:adityaswami93/hyperlocus',
      path: '/home/ubuntu/hyperlocus',
      'post-deploy': 'npm install && pm2 startOrRestart ecosystem.config.js'
    }
  }
}
