const jwt = require('jsonwebtoken');
const app = require('../../../app');

module.exports = (req, res, next) => {
  const token = req.body.token || req.query.token || req.headers['x-access-token'];

  if(token.length > 0) {
    jwt.verify(token, app.get('secretString'), (err, decoded) => {
      if(err) {
        res.json({
          success: false,
          message: 'Failed to authenticate token.'
        });
      } else {
        req.decoded = decoded;
        next();
      }
    });
  } else {
    res.status(403).json({
      success: false,
      message: 'No token provided.'
    });
  }
};
