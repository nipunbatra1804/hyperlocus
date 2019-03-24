module.exports = {
  apps: [{
    name: 'hyperlocus',
    script: './index.js'
  }],
  deploy: {
    production: {
      user: 'ubuntu',
      host: 'ec2-54-169-251-113.ap-southeast-1.compute.amazonaws.com',
      key: '/Users/adityaswami/Desktop/cs5224project.pem',
      ref: 'origin/master',
      repo: 'git@github.com:adityaswami93/hyperlocus.git',
      path: '/home/ubuntu/hyperlocus',
      'post-deploy': 'npm install && pm2 startOrRestart ecosystem.config.js'
    }
  }
}
