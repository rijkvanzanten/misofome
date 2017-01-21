const express = require('express');

const router = express.Router();

const addModelIfExists = require('../middleware/add-model-if-exists');
const checkToken = require('../middleware/check-token');
const uploadFile = require('../middleware/upload-file');
const processFile = require('../middleware/process-file');

// Create document
router.post('/:model', checkToken, addModelIfExists, uploadFile, processFile, (req, res) => {

  // Create data object
  const dataObj = Object.assign({}, req.body, {
    user: req.userID,
  });

  // Create Mongoose document
  const doc = new res.model(dataObj);

  // Save document to DB
  doc.save((err, record) => {
    // Something failed in DB
    if(err) {
      console.log(err);
      return res.status(500).end();
    }

    // Send newly created record
    res.status(201).json({ record });
  });
});

// Read documents
router.get('/:model', checkToken, addModelIfExists, (req, res) => {
  // This model may not be read
  if(res.model.disabled) return res.status(403).end();

  // Setup search parameters
  const collection = res.model.find();

  // Populate sub-fields with ?populate=[sub],[sub] query
  if(req.query.populate) {
    req.query.populate.split(',').forEach((populateOption) => {
      collection.populate(populateOption);
    });
  }

  // Set filter parameters with ?where[field]={value} query
  if(req.query.where) {
    Object.keys(req.query.where).forEach((key) => {
      collection.where(key).equals(req.query.where[key]);
    });
  }

  // Set item sorting based on ?order_by=[property] query
  if(req.query.order_by) {
    collection.sort({ [req.query.order_by]: req.query.order || 1});
  }

  // Set amount of records per page ?per_page=[num] (defaults to no limit)
  if(req.query.per_page) {
    collection.limit(Number(req.query.per_page));
  }

  // Allow page param only when per_page is set ?per_page=[num]&page=2
  if(req.query.per_page && req.query.page) {
    collection.skip(Number(req.query.per_page) * (Number(req.query.page) - 1));
  }

  // Execute search in DB
  collection.exec((err, records) => {
    // Something fails in DB
    if(err) {
      console.log(err);
      return res.status(500).end();
    }

    return res.json(records);
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
