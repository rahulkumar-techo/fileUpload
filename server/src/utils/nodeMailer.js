import nodemailer from "nodemailer";
import asyncHandler from "./asyncHandler.js";
import ResMsg from "./ResMsg.js";

const transporter = nodemailer.createTransport({
  service:"gmail",
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: false,
  auth: {
    user: process.env.SMTP_MAIL,
    pass: process.env.SMTP_PASSWORD,
  },
});





const sendEmail = asyncHandler(async (req, res) => {
  try {
    const { email, subject, message } = req.body;

    // Validate email, subject, and message here if needed

    const info = await transporter.sendMail({
      from: email,
      to: process.env.SMTP_MAIL,
      subject: subject,
      text: message,
      html:`<a> Welcome to my website Rahul kumar your Email is ${email} and message ${message} </a>` ,
    });

    new ResMsg(200, `Message has been send ${info.messageId}`);

    // Send a success response using the ResMsg class
    new ResMsg(200, "Email sent successfully").send(res);
  } catch (error) {
    console.error("Error sending email:", error);
    // Send an error response using the ResMsg class
    new ResMsg(500, "Internal Server Error").send(res);
  }
});

export default sendEmail;
