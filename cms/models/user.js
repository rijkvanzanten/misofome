/**
 * The user schema is required for the api auth to work
 */

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const SALT_WORK_FACTOR = 10;

const UserSchema = mongoose.Schema({
  username: { type: String, required: true, index: { unique: true } },
  password: { type: String, required: true },
  favorites: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'card'
  }]
});

UserSchema.pre('save', function(next) {
  // Only hash the password if it has been modified
  if(!this.isModified('password')) return next();

  // Generate salt
  bcrypt.genSalt(SALT_WORK_FACTOR, (err, salt) => {
    if(err) return next(err);

    // Hash the password along with the salt
    bcrypt.hash(this.password, salt, (err, hash) => {
      if(err) return next(err);

      // Override the password with the hashed one
      this.password = hash;
      next();
    });
  });
});

UserSchema.methods.comparePassword = function(candidatePassword, callback) {
  bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
    if(err) return callback(err);
    callback(null, isMatch);
  });
};

module.exports = mongoose.model('user', UserSchema);
