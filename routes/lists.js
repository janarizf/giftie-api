var express = require('express');
var listsModel = require('../model/listsmodel');
var customurlmodel = require('../model/customurlmodel')
var imagesmodel = require('../model/imagesmodel');
var groupsmodel = require('../model/groupsmodel');
var router = express.Router();
var bodyParser = require('body-parser')
var jsonParser = bodyParser.json();
const mongoose = require('mongoose');

const MongoClient = require("mongodb").MongoClient;
const GridFSBucket = require("mongodb").GridFSBucket;
const url = "mongodb+srv://admin:admin@giftie01.b3zn93e.mongodb.net/giftie";

const mongoClient = new MongoClient(url);

//const upload = require("../middleware/upload");
/* GET users listing. */
router.get('/', async function (req, res, next) {

  res.send('respond with a resource');
});

//Post Method
router.post('/create', jsonParser, async (req, res) => {
  const data = new listsModel({
    name: req.body.name,
    image: req.body.image,
    groupIds: req.body.groupIds,
    userId: req.body.userId,
    statusId: req.body.statusId,
    categoryId: req.body.categoryId,
    description: req.body.description,
    location: req.body.location,
    eventDate: req.body.eventDate,
    views: req.body.views,
    received: req.body.received,
    themes: req.body.themes,
    private: req.body.private,
    url: req.body.url,
    followers: req.body.followers,
    createdById: req.body.createdById,
    createdDate: req.body.createdDate,
    updatedById: req.body.updatedById,
    updatedDate: req.body.updatedDate,
  })
  //data.url = data._id;

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
    const data = await listsModel.find({ userId: req.params.user });
    res.json(data);
  }
  catch (error) {
    res.status(500).json({ message: error.message })
  }
})
router.get('/getByFollower/:user', async (req, res) => {
  try {
    const data = await listsModel.find({ "followers.userId": req.params.user });
    res.json(data);
  }
  catch (error) {
    res.status(500).json({ message: error.message })
  }
})
router.get('/getByGroup/:groupid', async (req, res) => {
  try {
    const groupdata = await groupsmodel.findById(req.params.groupid);
    const data = await listsModel.find({ _id: groupdata.lists });
    res.json(data);
  }
  catch (error) {
    res.status(500).json({ message: error.message })
  }
})
//Get by ID Method
router.get('/getById/:id', jsonParser, async (req, res) => {
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

router.post('/reserveurl', jsonParser, async (req, res) => {
  const data = new customurlmodel({
    url: req.body.url,
    approved: req.body.approved,
    approvedById: req.body.approvedById,
    approvedDate: req.body.approvedDate,
    createdById: req.body.createdById,
    createdDate: req.body.createdDate,
    updatedById: req.body.updatedById,
    updatedDate: req.body.updatedDate,
  })
  //data.url = data._id;

  try {
    const dataToSave = await data.save();
    res.status(200).json(dataToSave)
  }
  catch (error) {
    res.status(400).json({ message: error.message })
  }

})

router.get('/retrieveurl/:url', async (req, res) => {
  try {
    const data = await customurlmodel.find({ url: req.params.url });
    res.json(data);
  }
  catch (error) {
    res.status(500).json({ message: error.message })
  }
})



// router.post('/fileupload', jsonParser, async (req, res) => {
//   try {
//     await upload(req, res);
//     console.log(req.files);
//     var files = req.files;
//     res.status(200).json(files);
//   }
//   catch (error) {
//     res.status(400).json({ message: error.message })
//   }
// })

router.get('/getImage/:name', jsonParser, async (req, res) => {
  try {
    await mongoClient.connect();

    const database = mongoClient.db('giftie');
    const bucket = new GridFSBucket(database, {
      bucketName: 'images',
    });

    let downloadStream = bucket.openDownloadStreamByName(req.params.name);

    downloadStream.on("data", function (data) {
      return res.status(200).write(data);
    });

    downloadStream.on("error", function (err) {
      return res.status(404).send({ message: "Cannot download the Image!" });
    });
    downloadStream.on("end", () => {
      return res.end();
    });
  }
  catch (error) {
    res.status(500).json({ message: error.message })
  }
})


module.exports = router;
