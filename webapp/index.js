const path = require('path');
const express = require('express');
const compression = require('compression');

const port = process.env.PORT || 3002;
const dev = process.env.NODE_ENV !== 'production';
const standalone = process.env.STANDALONE || false;

const app = express();

app.use(compression());

if (dev) require('./wds');

// Make dist folder publicly available
app.use(express.static(path.join(__dirname, 'public', 'dist'), {
  index: false,
  maxage: 604800000,
}));

// Make static folder publicly available
app.use(express.static(path.join(__dirname, 'public', 'static'), {
  index: false,
  maxage: 604800000,
}));

app.use('*', (req, res) => {
  if (!dev) res.sendFile(path.join(__dirname, 'public', 'dist', 'index.html'));
});

// Listen to specified port when in standalone mode
if(standalone) {
  app.listen(port, () => {
    console.log(`App started at localhost:${port}`);
  });
}

module.exports = app;
