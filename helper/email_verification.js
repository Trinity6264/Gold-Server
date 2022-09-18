const nodemailer = require("nodemailer");
const { config } = require("dotenv") ;
const CustomError = require("../error/custom_error");
config();


const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.AUTH_EMAIL,
    pass: process.env.AUTH_PASSWORD,
  },
});

const sendEmail = async ({ to, subject, html }) => {
  try {
    return await transporter.sendMail({
      from: '"Autumshipmentalics" <autumshipmetalics@gmail.com>',
      to,
      subject,
      html,
      text: "Let's trade togerther"
    });
  } catch (error) {
    throw new CustomError(error.message);
  }
};

module.exports = sendEmail;
