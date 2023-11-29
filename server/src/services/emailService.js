import nodemailer from "nodemailer";
import ResMsg from "../utils/ResMsg.js";

const sendMailService = async ({ from, to, subject, text, html }) => {
  try {
    let transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: false,
      auth: {
        user: process.env.SMTP_MAIL,
        pass: process.env.SMTP_EXCHANGE_MAIL,
      },
    });

    const info = await transporter.sendMail({
      from: `rahulSender <${from}>`,
      to,
      subject,
      text,
      html,
    });

    // Respond with a success message or appropriate status code.
    return new ResMsg(200, "Email sent successfully" + info.messageId);
  } catch (error) {
    console.error("Error sending email:", error);
    // Respond with an error message or appropriate status code.
    return new ResMsg(500, "Internal Server Error");
  }
};

export default sendMailService;
