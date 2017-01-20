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
    ref: 'card',
  }],
  fullName: String,
  image: {
    type: Object,
    default: {
      filename: 'random-svg',
    },
  },
  amisosResults: Array,
});

UserSchema.pre('save', function hashPassword(next) {
  // Only hash the password if it has been modified
  if (!this.isModified('password')) return next();

  // Generate salt
  return bcrypt.genSalt(SALT_WORK_FACTOR, (err, salt) => {
    if (err) return next(err);

    // Hash the password along with the salt
    return bcrypt.hash(this.password, salt, (hashErr, hash) => {
      if (hashErr) return next(hashErr);

      // Override the password with the hashed one
      this.password = hash;
      return next();
    });
  });
});

// TODO: Password hashen on update bij PUT request
UserSchema.pre('update', () => {

});

UserSchema.methods.comparePassword = function comparePassword(candidatePassword, callback) {
  bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
    if (err) return callback(err);
    return callback(null, isMatch);
  });
};

const UserModel = mongoose.model('user', UserSchema);

UserModel.disabled = true;

module.exports = UserModel;
