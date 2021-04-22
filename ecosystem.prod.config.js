module.exports = {
  apps: [{
    name: 'server-app',
    script: 'ts-node',
    args: 'src/server/index.ts',
    watch: 'src/server',
  }, {
    name: 'web-app',
    script: 'webpack',
    args: 'serve --mode production --config ./src/webapp/webpack.config.prod.ts',
  }, {
    name: 'db-app',
    script: 'ts-node',
    args: 'src/db/index.ts',
    watch: 'src/db',
    ignore_watch: ['src/db/**/stores'],
  }],
};
