const express = require('express');

const router = express.Router();

const addModelIfExists = require('../middleware/add-model-if-exists');
const checkToken = require('../middleware/check-token');
const uploadFile = require('../middleware/upload-file');
const processFile = require('../middleware/process-file');

router.get('/:model', checkToken, addModelIfExists, (req, res) => {
  if (res.model.disabled) {
    return res.json({
      success: false,
      message: 'This model can\'t be viewed through this route',
    });
  }

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

router.post('/:model', checkToken, addModelIfExists, uploadFile, processFile, (req, res) => {
  if (res.model.disabled) {
    return res.json({
      success: false,
      message: 'This model can\'t be edited through this route',
    });
  }

  console.log(req.body);

  const dataObj = Object.assign({}, req.body, {
    user: req.user._id, // eslint-disable-line no-underscore-dangle
  });

  const doc = new res.model(dataObj); // eslint-disable-line new-cap

  doc.save((err, record) => {
    res.json({
      success: true,
      message: '',
      records: record,
    });
  });
});

router.put('/:model/:id', checkToken, addModelIfExists, (req, res) => {
  if (res.model.disabled) {
    return res.json({
      success: false,
      message: 'This model can\'t be edited through this route',
    });
  }

  if (!req.params.id) {
    res.json({
      success: false,
      message: 'ID param missing',
    });
  }

  res.model.findById(req.params.id, (err, doc) => {
    if (err) {
      res.json({
        success: false,
        message: err,
      });
    } else if (res.model.userLock && doc.user_id.toString() !== req.user._id) {
      res.json({
        success: false,
        message: 'Only the creator of this document is allowed to edit',
      });
    } else if (res.model.userLock && doc.user_id.toString() === req.user._id) {
      Object.assign(doc, req.body);
      doc.save((err, updatedDoc) => {
        if (err) {
          res.json({
            success: false,
            message: err,
          });
        } else {
          res.json(updatedDoc);
        }
      });
    }
  });
});

module.exports = router;
