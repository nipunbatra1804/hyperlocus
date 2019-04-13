module.exports = {
  apps: [{
    name  : 'hyperlocus-server',
    cwd   : './server',
    script  : 'server.js',
    watch       : true,
    env: {
      "PORT": 4000,
      "NODE_ENV": "development",
      "DATABASE_URL": "hyperlocus.ctuxzjkhxcw0.ap-southeast-1.rds.amazonaws.com" 
    },
    env_production : {
     "PORT": 4000,
     "NODE_ENV": "production"
    }
  },
  {
    name      : 'hyperlocus-client',
    cwd       : './client',
    script    : 'npm',
    args      : 'run start',
    watch     : true,
    env: {
      "NODE_ENV": "development",
    },
    env_production : {
      NODE_ENV: 'production'
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
      'post-deploy': 'git pull && npm install --prefix ./server && npm install --prefix ./client && pm2 startOrRestart ecosystem.config.js'
    }
  }
}
