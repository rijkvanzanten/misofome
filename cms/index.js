/**
 * Misofome
 *
 * @author Rijk van Zanten
 */

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');
const morgan = require('morgan');
const fs = require('fs');
const crypto = require('crypto');

const models = path.join(__dirname, '/models');

const app = module.exports = express();

// Register all models
fs.readdirSync(models)
  .filter(file => ~file.search(/^[^\.].*\.js$/))
  .forEach(file => require(path.join(models, file)));

// Connect to database
mongoose.connect('mongodb://localhost/misofome', (err) => {
  if(err) throw err;
  console.log('Database connected');
});

// Log incoming requests to console
app.use(morgan('dev'));

// Create random string for hashing purposes
app.set('secretString', crypto.randomBytes(64).toString('hex'));

// Set view engine
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

// Setup body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Set 'master' routes for api and admin
app.use('/admin', require('./routes/admin'));
app.use('/api', require('./routes/api'));

// Enable custom routes
app.use('/', require('./routes/custom'));

