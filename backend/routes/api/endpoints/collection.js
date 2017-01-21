const express = require('express');

const router = express.Router();

const addModelIfExists = require('../middleware/add-model-if-exists');
const checkToken = require('../middleware/check-token');
const uploadFile = require('../middleware/upload-file');
const processFile = require('../middleware/process-file');

// Create document
router.post('/:model', checkToken, addModelIfExists, uploadFile, processFile, (req, res) => {

  // Create data object
  const data = Object.assign({}, req.body, {
    createdBy: req.userID,
  });

  // Create Mongoose document
  const doc = new res.model(data);

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

// Update document
router.put('/:model/:id', checkToken, addModelIfExists, (req, res) => {
  // This model may not be updated
  if(res.model.disabled) return res.status(403).end();

  // id param is missing
  if (!req.params.id) return res.status(400).end();

  res.model.findById(req.params.id, (err, doc) => {
    // Something fails in DB
    if(err) {
      console.log(err);
      return res.status(500).end();
    }

    // Document may only be updated by the original creator
    if(res.model.userLock && doc.createdBy.toString() !== req.userID) {
      return res.status(401).end();
    }

    // Update document
    Object.assign(doc, req.body);

    // Save document to DB
    doc.save((err, updatedDoc) => {
      // Something fails in DB
      if(err) {
        console.log(err);
        return res.status(500).end();
      }

      res.json(updatedDoc);
    });
  });
});

module.exports = router;
