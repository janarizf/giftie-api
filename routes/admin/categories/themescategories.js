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


router.get('/getCategoryById/:id', async (req, res) => {
  try {
    const data = await listCategoriesModel.findById(req.params.id);
    res.json(data);
  }
  catch (error) {
    res.status(500).json({ message: error.message })
  }
});

router.post('/create', jsonParser, async (req, res) => {
  try {
    const data = new listCategoriesModel({
      category: req.body.category,
      private: req.body.private,
      active: req.body.active
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

    const result = await listCategoriesModel.findByIdAndUpdate(
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
    const data = await listCategoriesModel.findByIdAndDelete(id)
    res.send(`Document with ${data.name} has been deleted..`)
  }
  catch (error) {
    res.status(400).json({ message: error.message })
  }
});

module.exports = router;
