const jwt = require('jsonwebtoken');
const hashSecret = require('../hashSecret');

module.exports = (req, res, next) => {
  const token = req.headers['x-access-token'];

  if (token && token.length > 0) {
    jwt.verify(token, hashSecret, (err, decoded) => {
      // Token is invalid
      if(err) return res.status(401).end();

      req.userID = decoded._id;
      next();
    });
  } else {
    res.status(401).end();
  }
};
