const sendEmail = require("./email_verification");

const sendVerificationEmail = async ({ name, email, token, origin }) => {
  const verifyEmail = `${origin}/verifyemail/?token=${token}&email=${email}`;

  const message = `
  <p> We are glad you choose to be part of our community</p>
  <p>Please confirm your email by clicking on the following link: 
  <a href="${verifyEmail}">Verify Email</a> </p>
  `;
  // <img src="../src/assets/logo.png" alt="Logo" style="width: 50px; height: 50px;">

  return sendEmail({
    to: email,
    subject: "Email Confirmation from AUTUMSHIP MENTALICS",
    html: `<h4> Hello ${name},</h4> ${message}`,
  });
};

module.exports = sendVerificationEmail;
