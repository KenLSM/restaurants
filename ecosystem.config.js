module.exports = {
  apps: [{
    name: 'server-app',
    script: 'ts-node',
    args: 'src/server/index.ts',
    watch: 'src/server',
  }, {
    name: 'web-app',
    script: 'webpack',
    args: 'serve --mode development --config ./src/webapp/webpack.config.ts',
  }, {
    name: 'db-app',
    script: 'ts-node',
    args: 'src/db/index.ts',
    watch: 'src/db',
    ignore_watch: ['src/db/**/stores'],
  }],
};
