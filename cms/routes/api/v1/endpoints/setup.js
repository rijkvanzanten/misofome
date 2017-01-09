const express = require('express');
const mongoose = require('mongoose');

const router = express.Router();

router.get('/', (req, res) => {
  const User = mongoose.model('user');

  new User({
    username: 'rijk',
    password: '1234567890',
    admin: true
  }).save((err) => {
    if(err) throw err;
    console.log('User saved successfully');
    res.json({ success: true });
  });
});

module.exports = router;
