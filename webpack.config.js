'use strict';

const webpack = require('webpack');
const path = require('path');

module.exports = {
  entry: './index.js',
  output: {
    path: path.join(__dirname, '/dist'),
    filename: 'index.js',
    library: 'firestore-service',
    libraryTarget: 'umd'
  },
  resolve: {
    extensions: ['js'],
    modules: ['node_modules']
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader'
      }
    ]
  }
};
