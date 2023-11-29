import ResMsg from "../utils/ResMsg.js";
import upload from "../utils/multer.js";
import UploadFiles from "../model/fileSchema.js";
import { v4 as uuidv4 } from "uuid";
import "colors";

const upload_controller = (req, res, next) => {
  upload(req, res, async (err) => {
    if (err) {
      return res.status(500).send({ error: err.message });
    }
    const file = new UploadFiles({
      filename: req.file.filename,
      uuid: uuidv4(),
      path: req.file.path,
      size: req.file.size,
    });
    const response = await file.save();
    res.json({ file: `${process.env.APP_BASE_URL}/files/${response.uuid}` });
  });
};

export default upload_controller;
