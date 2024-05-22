import path from 'node:path';
import multer from 'multer';
import HttpError from '../helpers/HttpError.js';

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'tmp');
  },
  filename(req, file, cb) {
    const extname = path.extname(file.originalname);
    const basename = path
      .basename(file.originalname, extname)
      .replaceAll(' ', '_');
    cb(null, `${req.user._id}-${basename}${extname}`);
  },
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype.includes('image')) {
      cb(null, true);
      return;
    }
    cb(HttpError(400, 'Invalid file type for upload'));
  },
});

export default upload;
