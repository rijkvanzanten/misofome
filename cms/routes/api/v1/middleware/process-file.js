module.exports = (req, res, next) => {
  if (req.files) {
    req.body[req.files[0].fieldname] = req.files.length > 1 ? req.files : req.files[0];
  }

  next();
};
