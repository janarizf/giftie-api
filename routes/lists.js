var express = require('express');
var listsModel = require('../model/listsmodel')
var fileUploadModel = require('../model/fileuploadmodel')
var router = express.Router();
var bodyParser = require('body-parser')
var jsonParser = bodyParser.json();
const mongoose = require('mongoose');
const upload = require("../middleware/upload");
/* GET users listing. */
router.get('/', async function (req, res, next) {

  res.send('respond with a resource');
});

//Post Method
router.post('/create', jsonParser, async (req, res) => {
  const data = new listsModel({
    name: req.body.name,
    user_id: req.body.user_id,
    status_id: req.body.status,
    category_id: req.body.category,
    introduction: req.body.introduction,
    location: req.body.location,
    views: req.body.views,
    received: req.body.received,
    set_date: req.body.set_date,
    createdby: req.body.createdby,
    createddate: req.body.createddate,
    updatedby: req.body.updatedby,
    updateddate: req.body.updateddate
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
router.get('/getAll', async (req, res) => {
  try {
    const data = await listsModel.find();
    res.json(data);
  }
  catch (error) {
    res.status(500).json({ message: error.message })
  }

})
router.get('/getByUser/:user', async (req, res) => {
  try {
    const data = await listsModel.find({ user_id: req.params.user });
    res.json(data);
  }
  catch (error) {
    res.status(500).json({ message: error.message })
  }

})
//Get by ID Method
router.get('/getOne/:id', jsonParser, async (req, res) => {
  try {
    const data = await listsModel.findById(req.params.id);
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

    const result = await listsModel.findByIdAndUpdate(
      id, updatedData, options
    )

    res.send(result)
  }
  catch (error) {
    res.status(400).json({ message: error.message })
  }
})

router.patch('/additem/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const updatedData = req.body;
    const options = { new: true };

    const result = await listsModel.findByIdAndUpdate(
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
    const data = await listsModel.findByIdAndDelete(id)
    res.send(`Document with ${data.name} has been deleted..`)
  }
  catch (error) {
    res.status(400).json({ message: error.message })
  }
})

router.post('/fileupload', jsonParser, async (req, res) => {
  try {
    await upload(req, res);
    console.log(req.files);
    var files = req.files;
    res.status(200).json(files);
  }
  catch (error) {
    res.status(400).json({ message: error.message })
  }
})

router.get('/getAllFiles', async (req, res) => {
  try {
    const data = await fileUploadModel.find();
    res.json(data);
  }
  catch (error) {
    res.status(500).json({ message: error.message })
  }
})

module.exports = router;
