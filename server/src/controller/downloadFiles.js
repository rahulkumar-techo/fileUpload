import UploadFiles from "../model/fileSchema.js";
import ResMsg from "../utils/ResMsg.js";
import { fileURLToPath } from 'url';
import { dirname } from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const downloadFiles = async (req, res) => {
  const uuid = req.params.uuid;

  try {
    const file = await UploadFiles.findOne({ uuid }); 

    if (!file) {
      new ResMsg(404, "Link has been expired").send(res); 
      return;
    }

    const filePath = `${__dirname}/../${file.path}`;
   
  
    res.download(filePath); 
    new ResMsg(201, "Download successfully").send(res);
  } catch (error) {
    console.error("Error:", error);
    new ResMsg(500, "Internal Server Error").send(res);
  }
};

export default downloadFiles;
