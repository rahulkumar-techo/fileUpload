import UploadFiles from "../model/fileSchema.js";
import ResMsg from "../utils/ResMsg.js";

const showFiles = async (req, res) => {
  const uuid = req.params.uuid;
  try {
    const file = await UploadFiles.findOne({ uuid });

    if (!file) {
      return new ResMsg(400, "Link has been expired (❁´◡`❁)").send(res);
    }

    new ResMsg(200, {
      uuid: file.uuid,
      filename: file.filename,
      filesize: file.size,
      download: `${process.env.APP_BASE_URL}/files/download/${file.uuid}`,
    }).send(res);
  } catch (error) {
    console.error("Error:", error);
    new ResMsg(500, "Internal Server Error").send(res);
  }
};

export default showFiles;
