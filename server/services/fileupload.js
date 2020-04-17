
const multer = require('multer')
var upload = multer({ dest: 'uploads/' })

//check the type of file
const fileFilter = (req, file, callback) => {
  if (file.mimetype === 'image/jpg' || file.mimetype === 'image/png') {
    callback(null, true)
  } else {
    callback(new Error('Invalid Mime Type,only JPEG and PNG'), false);
  }
}
const upload = multer({
  fileFilter,
  storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now())
    }
  })
});

upload = multer({ storage: storage }),
  module.exports = upload;
