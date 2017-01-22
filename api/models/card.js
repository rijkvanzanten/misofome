const mongoose = require('mongoose');

const cardSchema = mongoose.Schema({
  // Required for userLock
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  },

  title: String,
  normalizedTitle: String,
  content: String,
  category: String,
  image: Object,
}, {
  timestamps: true, // enable mongoose timestamps (createdAt, updatedAt)
});

const Card = mongoose.model('card', cardSchema);

cardSchema.pre('save', function(next) {
  this.normalizedTitle = this.get('title').toLowerCase();
  next();
});

// Disable editing by others
Card.userLock = true;

module.exports = Card;
