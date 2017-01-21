/**
 * Misofome API
 *
 * @author Rijk van Zanten
 * January 2017
 */

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');
const morgan = require('morgan');
const fs = require('fs');
const cors = require('cors');

const port = process.env.PORT || 3000;
const dev = process.env.NODE_ENV !== 'production';
const standalone = process.env.STANDALONE || false;

const app = express();

// Allow cross origin resource sharing
app.use(cors());

// Log all incoming requests to console (only in dev mode)
if(dev) app.use(morgan('dev'));

// Register all models
const models = path.join(__dirname, '/models');
fs.readdirSync(models)
  .filter(file => ~file.search(/^[^\.].*\.js$/))
  .forEach(file => require(path.join(models, file)));

// Connect to database
mongoose.connect('mongodb://localhost/misofome', (err) => {
  if(err) throw err;
  console.log('Database connected');
});

// Make uploads folder publicly available
app.use(express.static(path.join(__dirname, 'uploads'), {
  index: false,
  maxage: 604800000,
}));

// Setup body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Set 'master' routes for api and admin
app.use('/api', require('./routes/api'));

// Enable custom routes
app.use('/', require('./routes/custom'));

// Listen to specified port when in standalone mode
if(standalone) {
  app.listen(port, () => {
    console.log(`API started at localhost:${port}`);
  });
}

module.exports = app;
