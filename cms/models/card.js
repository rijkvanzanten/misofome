const mongoose = require('mongoose');

const cardSchema = mongoose.Schema({
  title: String,
  content: String,
  category: String,
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  },
});

const Card = mongoose.model('card', cardSchema);

Card.userLock = true;

module.exports = Card;
