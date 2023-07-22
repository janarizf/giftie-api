
const nodemailer = require('nodemailer');

// Define your email sending route
router.get('/send-email', function(req, res) {
  const { recipient, subject, body } = req.body;

  // Create a nodemailer transporter using your email provider settings
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: 'your-email@gmail.com',
      pass: 'your-email-password',
    },
  });

  // Email options
  const mailOptions = {
    from: 'your-email@gmail.com',
    to: recipient,
    subject: subject,
    text: body,
  };

  // Send the email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log('Error sending email:', error);
      res.status(500).send('Error sending email');
    } else {
      console.log('Email sent:', info.response);
      res.status(200).send('Email sent successfully');
    }
  });
});
