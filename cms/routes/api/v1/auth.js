const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const app = require('../../../index');

const router = express.Router();

router.post('/', (req, res) => {
  const User = mongoose.model('user');

  User.findOne({ username: req.body.username }, (err, user) => {
    if(err) throw err;

    if(!user) {
      res.json({
        success: false,
        message: 'Auth failed. User not found'
      });
    } else {
      // Test a matching password
      user.comparePassword(req.body.password, (err, isMatch) => {
        if(err) throw err;
        if(isMatch) {
          const token = jwt.sign(user, app.get('secretString'), {
            expiresIn: '24h'
          });

          res.json({
            success: true,
            message: 'Enjoy your token!',
            token
          });
        } else {
          res.json({
            success: false,
            message: 'Auth failed. Wrong password'
          });
        }
      });
    }
  });
});

module.exports = router;
