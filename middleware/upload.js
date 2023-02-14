const multer = require('multer');
const { ALLOWED_EXTENSIONS } = require('../Constants');
const { GetUser } = require('../utils/token');

const storage = multer.diskStorage({
  destination: 'public/cdn/',
  filename: (req, file, callback) => {
    let fileFormat = file.mimetype.split('/');
    callback(null, GetUser(req.headers.authorization.split(' ')[1]).username.replace(/ /g, '') + '_' + Date.now().toString() + Math.floor(Math.random() * 90000 + 10000) + '.' + fileFormat[fileFormat.length - 1]);
  }
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 },
  fileFilter: (req, file, callback) => {
    if (!ALLOWED_EXTENSIONS.includes(file.mimetype)) {
      let error = new Error('Extension not allowed.');
      error.statusCode = 403;
      callback(null, false, error);
    }
    /*
    SUGGESTION(Ahmet): If the extension is changed here and stored as JPG, it will take up less space.
    if (file.mimetype !== 'image/jpg') {
      convert_to_jpg(file.path);
    }
    */
    callback(null, true);
  }
});

module.exports = upload