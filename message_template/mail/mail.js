const nodemailer = require("nodemailer"); 

const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASSWORD } = process.env;
console.log(SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASSWORD)
const sendEmail = async (options) => {
  // 1) Create a transporter
  const transporter = nodemailer.createTransport({
    service: SMTP_HOST,
    // port: SMTP_PORT,
    // secure: true,
    auth: {
      user: SMTP_USER,
      pass: SMTP_PASSWORD,
    },
  });

  // 2) Define the email options
  const mailOptions = {
    from: `Waka <${SMTP_USER}>`,
    to: options.email,
    subject: options.subject,
    text: options.message,
    html: options.html, // template html format
    message: options.message,
  };

  // 3) Actually send the email
  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
