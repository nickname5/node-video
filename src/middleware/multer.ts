import path from "path";
import { v4 as uuidv4 } from 'uuid';
import multer from 'multer';
import mime from 'mime-types';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.resolve(__dirname, '../storage')); // todo: move to config
  },
  filename: (req, file, cb) => {
    // console.log('multer: ', file, mime.extension(file.mimetype));
    cb(null, `${file.fieldname}_${uuidv4()}.${mime.extension(file.mimetype)}`);
  }
});

export const upload = multer({ storage });
