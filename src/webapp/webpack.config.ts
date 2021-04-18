const path = require('path');
const webpack = require('webpack');
const HtmlWebPackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/webapp/index.tsx',
  mode: 'development',
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
  devtool: 'inline-source-map',
  resolve: {
    extensions: ['*', '.js', '.jsx', '.ts', '.tsx'],
    alias: { '@': path.resolve(__dirname, './') },
  },
  output: {
    path: path.resolve(__dirname, 'dist/'),
    publicPath: '/dist/',
    filename: 'bundle.js',
  },
  devServer: {
    index: './src/webapp/index.html',
    contentBase: path.join(__dirname, 'public/'),
    port: 3000,
    publicPath: 'http://localhost:3000/dist/',
    hot: true,
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: path.resolve(__dirname, 'public/index.html'),
      filename: 'index.html',
    }),
  ],
};
