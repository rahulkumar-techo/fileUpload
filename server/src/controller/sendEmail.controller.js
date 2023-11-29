import UploadFiles from "../model/fileSchema.js";
import ResMsg from "../utils/ResMsg.js";
import sendMailService from "../services/emailService.js";
import htmldata from "../services/emailTemplate.js";

const exchangeFileViaEmail = async (req, res) => {
  const { uuid, emailTo, emailFrom } = req.body;

  if (!uuid || !emailTo || !emailFrom) {
    new ResMsg(400, "Check email not valid").send(res);
    return;
  }

  try {
    const file = await UploadFiles.findOne({ uuid });

    if (file.sender) {
      return res.status(422).send({ error: "Email already sent once." });
    }
    file.sender = emailFrom;
    file.receiver = emailTo;

    const response = await file.save();

    // Send mail with the help of nodemailer
    await sendMailService({
      from: emailFrom,
      to: emailTo,
      subject: "File Share",
      text: `${emailFrom} shared a file with you ${emailTo}`,
      html: htmldata({
        emailFrom,
        downloadLink: `${process.env.APP_BASE_URL}/files/${file.uuid}`,
        size: `${parseInt(file.size / 1000)} KB`,
        expires: "24 hours",
      }),
    });

    // Optionally, you might want to send a success response to the client.
    new ResMsg(200, "File shared via email successfully").send(res);
  } catch (error) {
    // Handle the error appropriately, log or send a specific error response.
    console.error("Error exchanging file via email:", error);
    new ResMsg(500, "Internal Server Error").send(res);
  }
};

export default exchangeFileViaEmail;
