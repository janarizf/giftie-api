var express = require('express');
var listCategoriesModel = require('../model/admin/listcategoriesmodel')
var themesmodel = require("../model/admin/themesmodel")
var router = express.Router();
var bodyParser = require('body-parser')
var jsonParser = bodyParser.json();

/* GET All list categories */
router.get('/getAllListCategories',jsonParser,async  (req, res) => {
    try{
      const data = await listCategoriesModel.find();
      res.json(data);
  }
  catch(error){
      res.status(500).json({message: error.message})
  }
})

router.get('/getAllThemes',jsonParser,async  (req, res) => {
  try{
    const data = await themesmodel.find();
    res.json(data);
}
catch(error){
    res.status(500).json({message: error.message})
}
})

module.exports = router;
