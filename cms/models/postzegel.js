const mongoose = require('mongoose');

const exerciseSchema = mongoose.Schema({
  name: String,
  rapportcijfer: Number
});

const Exercise = mongoose.model('postzegel', exerciseSchema);

module.exports = Exercise;
