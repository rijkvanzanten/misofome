const express = require('express');
const fs = require('fs');

const router = express.Router();

const addModelIfExists = require('../middleware/add-model-if-exists');
const checkToken = require('../middleware/check-token');
const processFile = require('../middleware/process-file');

router.get('/:model', checkToken, addModelIfExists, (req, res) => {
  // Set search params
  const collection = res.model.find({});

  // Populate sub-fields with ?populate=[sub],[sub] query
  if (req.query.populate) {
    req.query.populate.split(',').forEach((populateOption) => {
      collection.populate(populateOption);
    });
  }

  // ?where[field]={value}
  if (req.query.where) {
    Object.keys(req.query.where).forEach((key) => {
      collection.where(key).equals(req.query.where[key]);
    });
  }

  collection.exec((err, records) => {
    res.json(records);
  });
});

router.post('/:model', checkToken, addModelIfExists, (req, res) => {
  const doc = new res.model(req.body); // eslint-disable-line new-cap

  doc.save((err, record) => {
    res.json({
      success: true,
      message: '',
      records: record,
    });
  });
});

router.put('/:model/:id', checkToken, addModelIfExists, processFile, (req, res) => {
  if (!req.params.id) {
    res.json({
      success: false,
      message: 'ID param missing',
    });
  }

  res.model.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true }, (err, record) => {
    if (err) {
      res.json({
        success: false,
        message: err,
      });
    } else res.json(record);
  });
});

module.exports = router;
