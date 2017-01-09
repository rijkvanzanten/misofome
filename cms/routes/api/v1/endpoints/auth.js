const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const app = require('../../../../index');

const messages = require('../messages');

const router = express.Router();

router.post('/', (req, res) => {
  const User = mongoose.model('user');

  User.findOne({ username: req.body.username }, (err, user) => {
    if(err) throw err;

    if(!user) {
      res.json({
        success: false,
        message: messages.AUTH_USER_NOT_FOUND
      });
    } else {
      // Test a matching password
      user.comparePassword(req.body.password, (err, isMatch) => {
        if(err) throw err;
        if(isMatch) {
          const token = jwt.sign(user, app.get('secretString'));

          res.json({
            success: true,
            message: messages.AUTH_SUCCESS,
            token
          });
        } else {
          res.json({
            success: false,
            message: messages.AUTH_WRONG_PASSWORD
          });
        }
      });
    }
  });
});

module.exports = router;
