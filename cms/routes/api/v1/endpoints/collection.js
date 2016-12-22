const express = require('express');
const router = express.Router();

const addModelIfExists = require('../middleware/add-model-if-exists');
const checkToken = require('../middleware/check-token');

router.get('/:model', checkToken, addModelIfExists, (req, res) => {
  res.model.find({}, (err, records) => {
    res.json(records);
  });
});

router.post('/:model', checkToken, addModelIfExists, (req, res) => {
  const doc = new res.model(req.body);
  doc.save((err, record, numAffected) => {
    res.json({
      success: true,
      message: '',
      records: record
    });
  });
});

module.exports = router;
