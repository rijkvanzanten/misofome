const express = require('express');

const router = express.Router();

router.use('/auth', require('./endpoints/auth'));
router.use('/collection', require('./endpoints/collection'));

router.use('*', (req, res) => {
  res.send('Hi there');
});

module.exports = router;
