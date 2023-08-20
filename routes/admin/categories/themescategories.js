var express = require('express');
var themesCategoriesModel = require("../../../model/admin/themescategoriesmodel")
var router = express.Router();
var bodyParser = require('body-parser')
var jsonParser = bodyParser.json();

router.get('/getAllCategories', jsonParser, async (req, res) => {
  try {
    const data = await themesCategoriesModel.find();
    res.json(data);
  }
  catch (error) {
    res.status(500).json({ message: error.message })
  }
});


module.exports = router;
