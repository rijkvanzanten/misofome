const express = require('express');
const path = require('path');
const compression = require('compression');
const template = require('./template-html');

const port = process.env.PORT || 3000;
const dev = process.env.NODE_ENV != 'production';

const app = express();

app.use(compression());

if(dev) app.use(require('./dev-server'));

app.use(express.static(path.join(__dirname, 'dist'), {
  index: false,
  maxage: 604800000
}));

app.use(express.static(path.join(__dirname, 'static'), {
  index: false,
  maxage: 604800000
}));

app.use(require('./cms'));

app.use('*', (req, res) => {
  if(dev) res.send(template('', '/bundle.js'));
  else res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(port, () => {
  console.log('Server started');
});

module.exports = app;
