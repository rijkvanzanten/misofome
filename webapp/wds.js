const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const config = require('./webpack.config.dev.js');

module.exports = new WebpackDevServer(webpack(config), {
  publicPath: 'http://localhost:3001/',
  noInfo: false,
  quiet: false,
  inline: true,
  hot: true,
  stats: {
    colors: true,
    hash: false,
    timings: true,
    chunks: false,
    chunkModules: false,
    modules: false,
  },
  historyApiFallback: true,
  proxy: {
    '/**': {
      target: 'http://localhost:3000',
      secure: false,
      changeOrigin: true,
    }
  }
}).listen(3001, 'localhost', (err) => {
  if(err) {
    return console.log(err);
  }

  console.log('Dev server listening at 3001');
});
