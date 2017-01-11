const mongoose = require('mongoose');

const cardSchema = mongoose.Schema({
  title: String,
  content: String,
  category: String,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  },
});

const Card = mongoose.model('card', cardSchema);

module.exports = Card;
