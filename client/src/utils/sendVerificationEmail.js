const nodemailer = require("nodemailer");

const sendAuthenticationEmail = (email, verificationString) => {
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: 'quadstrconfirmation@gmail.com',
      pass: 't3stt3st',
    }
  });

  let confirmationUrl = `quadstr.com/api/auth/confirm?email=${email}&code=${verificationString}`;

  let info = await transporter.sendMail({
    from: '"Quadstr Confirmation" <quadstrconfirmation@gmail.com>',
    to: email,
    subject: "Confirm Your Email",
    text: `Visit this url to confirm your account: ${confirmationUrl}`,
    html: "<b>Hello world?</b>",
  });
}

export default sendAuthenticationEmail;