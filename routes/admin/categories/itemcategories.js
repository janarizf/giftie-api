var express = require('express');
var listCategoriesModel = require('../../../model/admin/listcategoriesmodel')
var router = express.Router();
var bodyParser = require('body-parser')
var jsonParser = bodyParser.json();

/* GET All list categories */
router.get('/getAllCategories', jsonParser, async (req, res) => {
  try {
    const data = await listCategoriesModel.find();
    res.json(data);
  }
  catch (error) {
    res.status(500).json({ message: error.message })
  }
});


module.exports = router;
