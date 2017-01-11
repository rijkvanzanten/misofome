const express = require('express');
const path = require('path');
const compression = require('compression');

const port = process.env.PORT || 3000;
const dev = process.env.NODE_ENV !== 'production';
const apiOnly = process.env.API_ONLY || false;

const app = express();

app.use(compression());

// eslint-disable-next-line global-require
if (dev && !apiOnly) app.use(require('./dev-server'));

app.use(express.static(path.join(__dirname, 'dist'), {
  index: false,
  maxage: 604800000,
}));

app.use(express.static(path.join(__dirname, 'static'), {
  index: false,
  maxage: 604800000,
}));

app.use(require('./cms'));

app.use('*', (req, res) => {
  if (!dev) res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(port, () => {
  console.log(`Server started at localhost:${port}`);
});

module.exports = app;
