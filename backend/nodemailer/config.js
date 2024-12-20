import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const transporter = nodemailer.createTransport({
  secure: true,
  host: process.env.NODEMAILER_HOST,
  port: process.env.NODEMAILER_PORT,
  auth: {
    user: process.env.NODEMAILER_EMAIL,
    pass: process.env.NODEMAILER_PASSWORD,
  },
  // debug: true,
  // logger: true,
  tls: {
    rejectUnauthorized: false,
  },
  requireTLS: true,
  connectionTimeout: 10000,
});

export const sendMail = async (to, subject, message) => {
  try {
    const mailOptions = {
      from: `"AJ Foods Support" <${process.env.NODEMAILER_EMAIL}>`,
      to,
      subject,
      html: message,
    };
    const info = await transporter.sendMail(mailOptions);
    console.log(info);
    return info;
  } catch (error) {
    console.error("Error sending mail", error);
    throw error;
  }
};
