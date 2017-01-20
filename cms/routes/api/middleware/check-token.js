const jwt = require('jsonwebtoken');
const app = require('../../../../index');

module.exports = (req, res, next) => {
  const token = req.body.access_token || req.query.access_token || req.headers['x-access-token'];

  if (token && token.length > 0) {
    jwt.verify(token, app.get('secretString'), (err, decoded) => {
      if (err) {
        res.json({
          success: false,
          message: 'Failed to authenticate token.',
        });
      } else {
        req.user = decoded._doc;
        next();
      }
    });
  } else {
    res.status(403).json({
      success: false,
      message: 'No token provided.',
    });
  }
};
