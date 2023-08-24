var express = require('express');
var adminUsermodel = require("../../../model/admin/adminusermodel")
var router = express.Router();
var bodyParser = require('body-parser')
var jsonParser = bodyParser.json();


module.exports = router;

router.get('/', async function (req, res, next) {
  res.send('admin api');
});

router.get('/getAll', jsonParser, async (req, res) => {
  try {
    const data = await listCategoriesModel.find();
    res.json(data);
  }
  catch (error) {
    res.status(500).json({ message: error.message })
  }
});

router.get('/login/:id', async (req, res) => {
    try {
      const data = await listCategoriesModel.findById(req.params.id);
      res.json(data);
    }
    catch (error) {
      res.status(500).json({ message: error.message })
    }
  });

router.get('/getById/:id', async (req, res) => {
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
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        active: req.body.active,
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