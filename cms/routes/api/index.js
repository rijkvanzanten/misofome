const express = require('express');

const router = express.Router();

router.use('/1', require('./v1'));

module.exports = router;
