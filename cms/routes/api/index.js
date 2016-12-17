const express = require('express');
const mongoose = require('mongoose');

const router = express.Router();

const addModelIfExists = (req, res, next) => {
  if(mongoose.modelSchemas[req.params.model]) {
      res.model = mongoose.model(req.params.model);
      next();
  } else {
    res.send(`Model [${req.params.model}] bestaat niet`);
  }
};

router.get('/:model', addModelIfExists, (req, res) => {
  res.model.find({}, (err, records) => {
    res.send(records);
  });
});

router.post('/:model', addModelIfExists, (req, res) => {
  const doc = new res.model(req.body);
  doc.save((err, record, numAffected) => {
    console.log(err, record, numAffected);
  });
});

module.exports = router;
