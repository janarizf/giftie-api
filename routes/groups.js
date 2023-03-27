var express = require('express');
var groupsModel = require('../model/groupsmodel')
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

//Post Method
router.post('/post', async (req, res) => {
    const data = new groupsModel({
        owner_id: req.body.user_id,
        owner_name: req.body.user,
        name: req.body.name,
        private: req.body.private,
        type_id: req.body.type_id,
        status_id: req.body.status_id,
        createdby: req.body.user,
        createddate: new Date(),
        updatedby: req.body.user,
        updateddate: new Date()
  })
  
  try{
    const dataToSave = await  data.save();
    res.status(200).json(dataToSave)
  }
  catch(error){
    res.status(400).json({message: error.message})
  }
  
  })
  
  //Get all Method
  router.get('/getAll',async  (req, res) => {
    try{
      const data = await groupsModel.find();
      res.json(data);
  }
  catch(error){
      res.status(500).json({message: error.message})
  }
   
  })
  
  //Get by ID Method
  router.get('/getOne/:id',async  (req, res) => {
    try{
      const data = await groupsModel.findById(req.params.id);
      res.json(data)
  }
  catch(error){
      res.status(500).json({message: error.message})
  }
  })
  
  //Update by ID Method
  router.patch('/update/:id',async  (req, res) => {
    try {
      const id = req.params.id;
      const updatedData = req.body;
      const options = { new: true };
  
      const result = await groupsModel.findByIdAndUpdate(
          id, updatedData, options
      )
  
      res.send(result)
  }
  catch (error) {
      res.status(400).json({ message: error.message })
  }
  })
  
  //Delete by ID Method
  router.delete('/delete/:id',async  (req, res) => {
    try {
      const id = req.params.id;
      const data = await groupsModel.findByIdAndDelete(id)
      res.send(`Document with ${data.name} has been deleted..`)
  }
  catch (error) {
      res.status(400).json({ message: error.message })
  }
  })
  

module.exports = router;
