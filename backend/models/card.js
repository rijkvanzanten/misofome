const mongoose = require('mongoose');

const cardSchema = mongoose.Schema({
  // Required for userLock
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  },

  title: String,
  content: String,
  category: String,
  image: Object,
}, {
  timestamps: true, // enable mongoose timestamps (createdAt, updatedAt)
});

const Card = mongoose.model('card', cardSchema);

// Disable editing by others
Card.userLock = true;

module.exports = Card;
