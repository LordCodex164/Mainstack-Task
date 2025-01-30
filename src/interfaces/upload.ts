import multer from 'multer';
import { Request } from 'express';

interface File_ {
    fieldname: string;
    originalname: string;
    encoding: string;
    mimetype: string;
    destination: string;
    filename: string;
}

const storage = multer.diskStorage({
  filename: function (req:Request,file:File_,cb:any) {
    cb(null, file.originalname)
  }
});

const upload = multer({storage: storage});

export default upload;