const path = require('path');
const multer = require('multer');

const VALID_FILE_TYPES = ['image/png', 'image/jpg', 'image/jpeg'];

const upload = multer({
  storage: multer.diskStorage({
    filename: (req, file, cb) => {
      cb(null, Date.now() + path.extname(file.originalname));
    },
    destination: (req, file, cb) => {
      cb(null, path.join(__dirname, '../../public/uploads'));
    },
  }),
  fileFilter: (req, file, cb) => {
    if (!VALID_FILE_TYPES.includes(file.mimetype)) {
      cb(new Error('Formato de imagen inválido. Debe ser .jpg, .jpeg o .png'));
    } else {
      cb(null, true);
    }
  },
});

module.exports = { upload: upload };
