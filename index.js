/**
 * Misofome
 *
 * (c) Rijk van Zanten & Vera van der Pennen ~ 2017
 *
 * This file starts both the api and webapp on one port for convenience's sake
 */

const express = require('express');
const path = require('path');

const app = express();

const port = process.env.PORT || 3000;

app.use('*', require('./api'));
app.use('*', require('./webapp'));

app.listen(port, () => {
  console.log('API & app started at port ' + port);
});
