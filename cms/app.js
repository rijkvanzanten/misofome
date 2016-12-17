const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');
const fs = require('fs');

const models = path.join(__dirname, '/models');

const app = express();

// Register all models
fs.readdirSync(models)
  .filter(file => ~file.search(/^[^\.].*\.js$/))
  .forEach(file => require(path.join(models, file)));

// Connect to database
mongoose.connect('mongodb://localhost/misofome');
const db = mongoose.connection;
db.on('error', (err) => { console.error('Database connection failed: ' + err); });
db.once('open', () => { console.log('Database successfully connected'); });

// Set view engine
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

// Setup body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// Set 'master' routes
app.use('/admin', require('./routes/admin'));
app.use('/api', require('./routes/api'));

app.use('*', (req, res) => {
  res.send('PWA');
});

module.exports = app;
