const multer = require('multer');
const path = require('path');

const publicPath = path.join(__dirname, '..', '..', '..', 'uploads');

const acceptedFileTypes = [
  'image/png',
  'image/jpeg',
  'image/pjpeg',
  'image/gif',
  'image/svg+xml',
];

function fileFilter(req, file, cb) {
  if (acceptedFileTypes.indexOf(file.mimetype) === -1) {
    cb(null, false);
  } else {
    cb(null, true);
  }
}

const upload = multer({
  dest: publicPath,
  fileFilter,
});

module.exports = upload.any();
