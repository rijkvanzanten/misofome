const mongoose = require('mongoose');

const exerciseSchema = mongoose.Schema({
  name: String,
  rating: Number
});

const User = mongoose.model('Exercise', exerciseSchema);

module.exports = Exercise;
