const nodemailer = require('nodemailer');

const sendEmail = async(to, resetUrl) => {
  

let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
    user: process.env.TRANSPORTER_MAILER,
    pass: process.env.TRANSPORTER_PASSWORD
    }
});


  // setup email data
const mailOptions = {
    from: process.env.TRANSPORTER_MAILER,
    to,
    subject: 'Password Reset',
    // text: 'Don\'t forget to save the date!',
    html: `<p>You requested a password reset.
    click this <a href="${resetUrl}">link</a> to change your password</p>`
  };
  
  // send email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
    console.log('Message sent: %s', info.messageId);
  });

  
}

module.exports = sendEmail;