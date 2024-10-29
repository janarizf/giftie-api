var express = require('express');
var themesmodel = require("../../../model/admin/themesmodel")
var router = express.Router();
var bodyParser = require('body-parser')
var jsonParser = bodyParser.json();

router.get('/', async function (req, res, next) {
  res.send('themes api');
});

router.get('/getAllThemes', jsonParser, async (req, res) => {
    try {
      const data = await themesmodel.find();
      res.json(data);
    }
    catch (error) {
      res.status(500).json({ message: error.message })
    }
  });
  
  router.get('/getThemesById/:id', async (req, res) => {
    try {
      const data = await themesmodel.findById(req.params.id);
      res.json(data);
    }
    catch (error) {
      res.status(500).json({ message: error.message })
    }
  });
  
  router.get('/getActiveThemes', async (req, res) => {
    try {
      const data = await themesmodel.find({active: true});
      res.json(data);
    }
    catch (error) {
      res.status(500).json({ message: error.message })
    }
  });
  
  router.get('/getThemesByCategory/:cat', async (req, res) => {
    try {
      const data = await themesmodel.find({category_id: req.params.cat});
      res.json(data);
    }
    catch (error) {
      res.status(500).json({ message: error.message })
    }
  });
  
  //Post Method
  router.post('/create', jsonParser, async (req, res) => {
    try {
      const data = new themesmodel({
        name: req.body.name,
        category_id: req.body.category_id,
        headercolor: req.body.headercolor,
        bodycolor: req.body.bodycolor,
        textcolor: req.body.textcolor,
        headerimage: req.body.headerimage,
        backgroundimage: req.body.backgroundimage,
      })
  
      const dataToSave = await data.save();
      res.status(200).json(dataToSave)
    }
    catch (error) {
      res.status(400).json({ message: error.message })
    }
  
  });
  
  router.patch('/update/:id', async (req, res) => {
    try {
      const id = req.params.id;
      const updatedData = req.body;
      const options = { new: true };
  
      const result = await themesmodel.findByIdAndUpdate(
        id, updatedData, options
      )
  
      res.send(result)
    }
    catch (error) {
      res.status(400).json({ message: error.message })
    }
  });
  
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
  

  
module.exports = router;
