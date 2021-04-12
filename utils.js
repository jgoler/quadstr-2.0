const nodemailer = require("nodemailer");

const sendAuthenticationEmail = async (email, verificationString) => {
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: 'quadstrconfirmation@gmail.com',
<<<<<<< HEAD
      pass: 'las#h39oihlk$ja;glj9J496u&-=',
=======
      pass: 'asklje83hhaihdjoih4dnf%T0Us',
>>>>>>> 0f72e792fd4b2a05b5ef5bfba900bce21ffc87b5
    }
  });

  let confirmationUrl = `quadstr.com/confirm?email=${email}&code=${verificationString}`;

  let info = await transporter.sendMail({
    from: '"Quadstr Confirmation" <quadstrconfirmation@gmail.com>',
    to: email,
    subject: "Confirm Your Email",
    text: `Visit this url to confirm your account: ${confirmationUrl}`,
    html: `<a href="${confirmationUrl}">Click here to verify your account</a>`,
  });
}

module.exports = { sendAuthenticationEmail };