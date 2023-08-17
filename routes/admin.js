var express = require('express');
var listCategoriesModel = require('../model/admin/listcategoriesmodel')
var themesCategoriesModel = require("../model/admin/themescategoriesmodel")
var themesmodel = require("../model/admin/themesmodel")
var router = express.Router();
var bodyParser = require('body-parser')
var jsonParser = bodyParser.json();

/* GET All list categories */
router.get('/getAllListCategories', jsonParser, async (req, res) => {
  try {
    const data = await listCategoriesModel.find();
    res.json(data);
  }
  catch (error) {
    res.status(500).json({ message: error.message })
  }
})
router.get('/themes/getAllThemesCategories', jsonParser, async (req, res) => {
  try {
    const data = await themesCategoriesModel.find();
    res.json(data);
  }
  catch (error) {
    res.status(500).json({ message: error.message })
  }
})

router.get('/themes/getAllThemes', jsonParser, async (req, res) => {
  try {
    const data = await themesmodel.find();
    res.json(data);
  }
  catch (error) {
    res.status(500).json({ message: error.message })
  }
})

router.get('/themes/getThemesById/:id', async (req, res) => {
  try {
    const data = await themesmodel.findById(req.params.id);
    res.json(data);
  }
  catch (error) {
    res.status(500).json({ message: error.message })
  }
})

//Post Method
router.post('/themes/create', jsonParser, async (req, res) => {
  try {
    const data = new themesmodel({
      name: req.body.name,
      category_id: req.body.category_id,
      headercolor: req.body.name,
      bodycolor: req.body.body,
      textcolor: req.body.text,
      headerimage: req.body.header,
      backgroundimage: req.body.background,
    })

    const dataToSave = await data.save();
    res.status(200).json(dataToSave)
  }
  catch (error) {
    res.status(400).json({ message: error.message })
  }

})

module.exports = router;
