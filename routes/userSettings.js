var express = require('express');
var usersSettingsModel = require('../model/usersettingsmodel')
var router = express.Router();
var bodyParser = require('body-parser')
var jsonParser = bodyParser.json();
const mongoose = require('mongoose');

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

//Post Method
router.post('/create', jsonParser, async (req, res) => {
  const data = new usersSettingsModel({
    userId: req.body.userId,
    newUpdate: false,
    newFeature: false,
    desktopNotif: false,
    emailNotif: false,
    mobileNotif: false,
    twoFactor: false,
    topGifters: false,
    upcomingList: false,
    giftExchange: false,
    pastList: false,

    createdById: req.body.userId,
    createdDate: new Date(),
    updatedById: req.body.userId,
    updatedDate: new Date(),
  })

  try {
    const dataToSave = await data.save();
    res.status(200).json(dataToSave)
  }
  catch (error) {
    res.status(400).json({ message: error.message })
  }

})

//Get all Method
router.get('/getAll', jsonParser, async (req, res) => {
  try {
    const data = await usersSettingsModel.find();
    res.json(data);
  }
  catch (error) {
    res.status(500).json({ message: error.message })
  }

})

//Get by ID Method
router.get('/getOne/:id', async (req, res) => {
  try {
    const data = await usersSettingsModel.findById(req.params.id);
    res.json(data)
  }
  catch (error) {
    res.status(500).json({ message: error.message })
  }
})

//Get by ID Method
router.get('/findByEmail/:email', jsonParser, async (req, res) => {
  try {
    const data = await usersSettingsModel.find({ email: req.params.email },);
    res.json(data)

  }
  catch (error) {
    res.status(500).json({ message: error.message })
  }
})

//Update by ID Method
router.patch('/update/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const updatedData = req.body;
    const options = { new: true };

    const result = await usersSettingsModel.findByIdAndUpdate(
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
    const data = await usersSettingsModel.findByIdAndDelete(id)
    res.send(`Document with ${data.name} has been deleted..`)
  }
  catch (error) {
    res.status(400).json({ message: error.message })
  }
})


module.exports = router;
