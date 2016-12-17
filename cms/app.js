const express = require('express');
const bodyParser = require('body-parser');

const app = express();

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
