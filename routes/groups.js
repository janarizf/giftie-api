var express = require('express');
var groupsModel = require('../model/groupsmodel')
var router = express.Router();
const nodemailer = require('nodemailer');
/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

router.get('/getByUser/:user', async (req, res) => {
  try {
    const data = await groupsModel.find({ owner_id: req.params.user });
    res.json(data);
  }
  catch (error) {
    res.status(500).json({ message: error.message })
  }

});

router.post('/addmember', async (req, res) => {
  try {
    const { user_id, name, email, group_id } = req.body;
    const user = {
      user_id: user_id,
      name: name,
      email: email
    }
    const group = await groupsModel.findById(group_id);
    group.members.push(user);

    const options = { new: true };

    const result = await groupsModel.findByIdAndUpdate(
      group_id,  group, options
    )



    res.json(result);
  }
  catch (error) {
    res.status(500).json({ message: error.message })
  }

});

//Post Method
router.post('/create', async (req, res) => {
  const data = new groupsModel({
    owner_id: req.body.owner_id,
    owner: req.body.owner,
    groupname: req.body.groupname,
    private: req.body.private,
    type: req.body.type,
    status: req.body.status,
    createdby: req.body.owner,
    createddate: new Date(),
    updatedby: req.body.owner,
    updateddate: new Date(),
    members: req.body.members,
    invited: req.body.invited,
    lists: req.body.lists
  });

  try {
    const dataToSave = await data.save();
    res.status(200).json(dataToSave)
  }
  catch (error) {
    res.status(400).json({ message: error.message })
  }

});

//Get all Method
router.get('/getAll', async (req, res) => {
  try {
    const data = await groupsModel.find();
    res.json(data);
  }
  catch (error) {
    res.status(500).json({ message: error.message })
  }

});

//Get by ID Method
router.get('/getOne/:id', async (req, res) => {
  try {
    const data = await groupsModel.findById(req.params.id);
    res.json(data)
  }
  catch (error) {
    res.status(500).json({ message: error.message })
  }
});

//Update by ID Method
router.patch('/update/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const updatedData = req.body;
    const options = { new: true };

    const result = await groupsModel.findByIdAndUpdate(
      id, updatedData, options
    )

    res.send(result)
  }
  catch (error) {
    res.status(400).json({ message: error.message })
  }
})

//Delete by ID Method
router.delete('/delete/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const data = await groupsModel.findByIdAndDelete(id)
    res.send(`Document with ${data.name} has been deleted..`)
  }
  catch (error) {
    res.status(400).json({ message: error.message })
  }
});

router.post('/acceptinvite/:id', async function (req, res) {
  const groupid = req.params.id;

});


router.post('/sendinvite', async function (req, res) {
  const { emails, groupid } = req.body;

  const subject = 'Invite to Join Giftie';
  const groupUrl = 'https://giftie.com/signup';
  const body = emailTemplate + emailBody1 + groupUrl + emailBody2 + emailTemplate2;
  // Create a nodemailer transporter using your email provider settings
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: 'rizu.wonderland@gmail.com',
      pass: 'zhumdqmiaecjohot',
    },
  });

  // Email options
  const mailOptions = {
    from: 'your-email@gmail.com',
    to: emails,
    subject: subject,
    html: body,
  };

  // Send the email
  transporter.sendMail(mailOptions, async (error, info) => {
    if (error) {
      console.log('Error sending email:', error);
      res.status(500).send('Error sending email');
    } else {
      console.log('Email sent:', info.response);
      const emailList = emails.split(',');
      const options = { new: true };
      var updatedData = await groupsModel.findById(groupid);
      updatedData.invited = emailList;
      const result = await groupsModel.findByIdAndUpdate(
        groupid, updatedData, options
      )
      console.log(result);
      res.status(200).send('Email sent successfully');


    }
  });
});

const emailTemplate = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Giftie Email Template</title>
      <style>
        /* Inline CSS styles for better compatibility */
        body {
          font-family: Arial, sans-serif;
          line-height: 1.6;
        }

        h1 {
          color: #044237;
        }

        p {
          color: #333333;
        }
        a {
          color: #ffffff;
        }
        .button {
          background-color: #ab1066;
          border: none;
          color: #ffffff;
          padding: 10px 10px;
          text-align: center;
          text-decoration:solid;
          display: inline-block;
          margin: 4px 4px;
          cursor: pointer;
          border-radius: 25px;
          min-width: 10em;
        }

        .container {
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
          border: 1px solid #dddddd;
          border-radius: 5px;
        }
      </style>
    </head>
    `;
const emailTemplate2 = `</html>`;
const emailBody1 = ` <body>
  <div class="container">
    <h1>You are invited to join Giftie</h1>
    <p>Dear Client,</p>
    <p>You are invited to Join a list group in Giftie. To continue click the join button below </p>
    <p>Best regards,</p>
    <p>Giftie Team</p>

    <p>
    <a class="button" href="`
  ;
const emailBody2 = `">Visit Our Website</a>
    </p>
  </div>
</body>`;
const emailBodyNews = ` <body>
  <div class="container">
    <h1>Welcome to our Newsletter</h1>
    <p>Dear [Recipient],</p>
    <p>Thank you for subscribing to our newsletter. We'll keep you updated with the latest news and offers.</p>
    <p>Stay tuned!</p>
    <p>Best regards,</p>
    <p>The Newsletter Team</p>

    <p>
      <a class="button" href="https://giftie.com">Visit Our Website</a>
    </p>
  </div>
</body>`;

module.exports = router;
