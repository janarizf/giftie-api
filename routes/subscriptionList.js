var express = require('express');
var subscriptionlist = require('../model/subscriptionlistmodel')
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
  const data = new subscriptionlist({
    email: req.body.email,
    createdDate: new Date()
  })
  try {
    const dataToSave = await data.save();
    res.status(200).json(dataToSave)
  }
  catch (error) {
    res.status(400).json({ message: error.message })
  }
})
router.get('/getAll', async (req, res) => {
  try {
    const data = await subscriptionlist.find();
    res.json(data);
  }
  catch (error) {
    res.status(500).json({ message: error.message })
  }

})
module.exports = router;
