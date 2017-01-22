const crypto = require('crypto');

// Create random string for api-auth hashing purposes
module.exports = crypto.randomBytes(64).toString('hex');
