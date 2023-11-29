import multer from "multer";
import path from "path"

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
      const uniquename = `${Date.now()}-${Math.round(Math.random()* 1E9)}${path.extname(file.originalname)}`
      cb(null,uniquename);
    },
  });

  let upload = multer({ storage, limits:{ fileSize: 1000000 * 100 }, }).single('myfile'); //100mb

  export default upload;