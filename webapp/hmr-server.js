const express = require('express');
const webpack = require('webpack');
const webpackMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');

const config = require('./webpack.config.dev.js');

const app = express();

const compiler = webpack(config);

app.use(webpackMiddleware(compiler, {
  noInfo: true,
  hot: true,
  historyApiFallback: true,
  publicPath: '/',
  progress: true,
  contentBase: process.cwd(),
}));
app.use(webpackHotMiddleware(compiler));

module.exports = app;
