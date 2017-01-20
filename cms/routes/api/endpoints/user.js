const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const uploadFile = require('../middleware/upload-file');
const processFile = require('../middleware/process-file');
const checkToken = require('../middleware/check-token');

// Require original server app (contains hashing secret)
const app = require('../../../index');

const router = express.Router();

// Authenticate user
router.post('/login', (req, res) => {
  const User = mongoose.model('user');

  User
    .findOne({ username: req.body.username})
    .select('+password -_id')
    .exec((err, user) => {

      // Something fails in database
      if(err) {
        console.log(err);
        res.status(500).end();
      }

      // User wasn't found
      if(!user) return res.status(401).end();

      // Compare given password with stored password
      user.comparePassword(req.body.password, (err, isMatch) => {

        // Something fails in database
        if(err) {
          console.log(err);
          res.status(500).end();
        }

        // If passwords match
        if(isMatch) {
          // Select the user again with all fields populated (no password field)
          User
            .findOne({ username: req.body.username})
            .populate({
              path: 'favorites',
              populate: {
                path: 'user',
              },
            })
            .exec((err, user) => {
              // Something fails in database
              if(err) {
                console.log(err);
                res.status(500).end();
              }

              // Generate access token
              const { _id } = user;
              const token = jwt.sign({ _id }, app.get('secretString'));

              // Send access token and user object to client
              res.status(200).json({ user, token });
            });
        }
      });
    });
});

// Create new user
router.post('/', uploadFile, processFile, (req, res) => {
  const User = mongoose.model('user');

  const newUser = new User(req.body);

  newUser.save((err, record, numAffected) => {
    console.log(err);
    if (err) {
      res.json({ success: false, message: err });
    } else {
      const token = jwt.sign(newUser, app.get('secretString'));

      res.json({
        success: true,
        message: 'User created',
        token,
        user: record,
      });
    }
  });
});

// Update existing user
router.put('/', checkToken, uploadFile, processFile, (req, res) => {
  const User = mongoose.model('user');

  User.findById(req.user._id)
    .exec((err, doc) => {
      if (err) {
        res.json({
          success: false,
          message: err,
        });
      }

      Object.assign(doc, req.body);

      doc.save((err, updatedDoc) => {
        User.findById(req.user._id)
          .populate({
            path: 'favorites',
            populate: {
              path: 'user'
            }
          })
          .exec((err, doc) => {
            if (err) {
              res.json({
                success: false,
                message: err,
              });
            } else {
              res.json({
                success: true,
                user: doc,
              });
            }
          });
      });
    });
  });

module.exports = router;
