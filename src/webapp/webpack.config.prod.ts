const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/webapp/index.tsx',
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        options: { presets: ['@babel/env'] },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.svg$/,
        use: ['url-loader'],
      },
      {
        test: /\.(jpeg|jpg|png)$/,
        use: ['file-loader'],
      },
      {
        test: /\.(ts|tsx)$/,
        use: ['ts-loader'],
      },
    ],
  },
  resolve: {
    extensions: ['*', '.js', '.jsx', '.ts', '.tsx'],
    alias: { '@': path.resolve(__dirname, './') },
  },
  output: {
    path: path.resolve(__dirname, 'dist/'),
    publicPath: '/dist/',
    filename: 'bundle.js',
    clean: true,
  },
  devServer: {
    index: './src/webapp/index.html',
    contentBase: path.join(__dirname, 'public/'),
    port: 3000,
    publicPath: '/dist/',
    historyApiFallback: true,
    host: '0.0.0.0',
    disableHostCheck: true
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: path.resolve(__dirname, 'public/index.html'),
      filename: 'index.html',
    }),
  ],
  performance: {
    hints: false,
  },
};

// lets ts know that this is not a global env
export { };
