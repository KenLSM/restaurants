module.exports = {
  apps: [{
    name: "server-app",
    script: 'ts-node',
    args: "src/server/index.ts",
    watch: 'src/server',
  }, {
    name: "web-app",
    script: "webpack",
    args: "serve --mode development --config ./src/webapp/webpack.config.ts",
  }, {
    name: "db-app",
    script: "ts-node",
    args: "src/db/index.ts",
    watch: 'src/db',
    ignore_watch: ['src/db/**/stores']
  }],

  // deploy : {
  //   production : {
  //     user : 'SSH_USERNAME',
  //     host : 'SSH_HOSTMACHINE',
  //     ref  : 'origin/master',
  //     repo : 'GIT_REPOSITORY',
  //     path : 'DESTINATION_PATH',
  //     'pre-deploy-local': '',
  //     'post-deploy' : 'npm install && pm2 reload ecosystem.config.js --env production',
  //     'pre-setup': ''
  //   }
  // }
};
