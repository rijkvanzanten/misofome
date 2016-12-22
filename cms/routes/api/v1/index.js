const express = require('express');
const addModelIfExists = require('./middleware/add-model-if-exists');
const checkToken = require('./middleware/check-token');

const router = express.Router();

router.get('/', (req, res) => {
  res.json({
    message: 'Hello World'
  });
});

router.use('/setup', require('./setup'));

router.use('/auth', require('./auth'));

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
