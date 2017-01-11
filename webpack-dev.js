/* eslint-disable import/no-extraneous-dependencies */
const webpack = require('webpack');
const path = require('path');

module.exports = {
  entry: [
    'webpack/hot/dev-server',
    'webpack-hot-middleware/client',
    './pwa/index.jsx',
  ],
  output: {
    path: '/',
    filename: 'bundle.js',
    publicPath: '/',
    pathinfo: true,
  },
  cache: true,
  debug: true,
  devtool: 'eval',
  target: 'web',
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"development"',
      },
    }),
  ],
  module: {
    loaders: [
      {
        test: /\.json$/,
        loader: 'json',
      },
      {
        test: /\.woff$/,
        loaders: ['url?limit=50000&name=[name].[ext]?[hash:5]'],
      },
      {
        test: /\.jsx?$/,
        loader: 'babel',
        query: {
          plugins: [
            path.resolve(__dirname, './node_modules/babel-plugin-transform-decorators-legacy'),
          ],
          presets: [
            path.resolve(__dirname, './node_modules/babel-preset-es2015'),
            path.resolve(__dirname, './node_modules/babel-preset-react'),
            path.resolve(__dirname, './node_modules/babel-preset-react-hmre'),
            path.resolve(__dirname, './node_modules/babel-preset-stage-1'),
          ],
        },
        exclude: /node_modules/,
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loaders: [
          'url?limit=10000&name=[name].[ext]?[hash:5]',
          'image-webpack?bypassOnDebug&optimizationLevel=7&interlaced=false',
        ],
      },
    ],
  },
  resolve: {
    root: process.cwd(),
    extensions: ['', '.js', '.jsx'],
  },
  node: {
    __dirname: true,
    fs: 'empty',
  },
};
