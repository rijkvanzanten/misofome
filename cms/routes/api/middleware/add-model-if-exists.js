const mongoose = require('mongoose');

module.exports = (req, res, next) => {
  if(mongoose.modelSchemas[req.params.model]) {
      res.model = mongoose.model(req.params.model);
      next();
  } else {
    res.json({
      success: false,
      message: `Model [${req.params.model}] bestaat niet`
    });
  }
};
