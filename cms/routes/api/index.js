const express = require('express');

const router = express.Router();

router.use('/user', require('./endpoints/user'));
router.use('/collection', require('./endpoints/collection'));
router.use('*', (req, res) => res.status(404).send('Route not found'));

module.exports = router;
