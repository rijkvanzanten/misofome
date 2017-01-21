const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  context: __dirname,
  entry: [
    'webpack/hot/dev-server',
    'webpack-hot-middleware/client',
    './src/index.jsx',
  ],
  output: {
    path: '/',
    filename: 'bundle.js',
    publicPath: '/',
  },
  devtool: 'eval',
  target: 'web',
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"development"',
      },
    }),
    new HtmlWebpackPlugin({
      template: 'template-html.ejs',
    }),
  ],
  module: {
    rules: [
      {
        test: /\.json$/,
        use: ['json-loader']
      },
      {
        test: /\.woff$/,
        use: [{
          loader: 'url-loader',
          query: {
            limit: 50000,
            name: '[name].[ext]?[hash:5]',
          }
        }],
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader'
          }
        ]
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/,
        use: [
          {
            loader: 'url-loader',
            query: {
              limit: 10000,
              name: '[name].[ext]?[hash:5]',
            },
          },
          {
            loader: 'image-webpack-loader',
            query: {
              bypassOnDebug: true,
              optimizationLevel: 7,
              interlaced: false,
            },
          },
        ]
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx']
  }
};
