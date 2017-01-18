const express = require('express');

const router = express.Router();

router.use('/user', require('./endpoints/user'));
router.use('/collection', require('./endpoints/collection'));

module.exports = router;
