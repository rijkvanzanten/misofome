const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const config = require('./webpack.config.dev.js');

module.exports = new WebpackDevServer(webpack(config), {
  publicPath: config.output.publicPath,
  hot: true,
  noInfo: true,
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
