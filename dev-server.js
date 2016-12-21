const express = require('express');
const webpack = require('webpack');
const webpackMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');

const app = express();

const config = require('./webpack-dev.js');
const compiler = webpack(config);
const middleware = webpackMiddleware(compiler, {
  contentBase: 'src',
  noInfo: true,
  quiet: false,
  stats: {
    colors: true,
    hash: false,
    timings: true,
    chunks: false,
    chunkModules: false,
    modules: false
  }
});

app.use(middleware);
app.use(webpackHotMiddleware(compiler));

module.exports = app;
