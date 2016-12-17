const mongoose = require('mongoose');

const exerciseSchema = mongoose.Schema({
  name: String,
  rating: Number
});

const Exercise = mongoose.model('exercise', exerciseSchema);

module.exports = Exercise;
