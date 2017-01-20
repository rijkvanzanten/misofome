const jwt = require('jsonwebtoken');
const app = require('../../../index');

module.exports = (req, res, next) => {
  const token = req.headers['x-access-token'];

  if (token && token.length > 0) {
    jwt.verify(token, app.get('secretString'), (err, decoded) => {
      // Something fails in with decoding jwt
      if(err) {
        console.log(err);
        return res.status(500).end();
      }

      req.userID = decoded._id;
      next();
    });
  } else {
    res.status(401).end();
  }
};
