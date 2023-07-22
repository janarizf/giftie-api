var express = require('express');
var groupsModel = require('../model/groupsmodel')
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/getByUser/:user', async (req, res) => {
  try {
    const data = await groupsModel.find({ owner_id: req.params.user });
    res.json(data);
  }
  catch (error) {
    res.status(500).json({ message: error.message })
  }

})

router.post('/adduser/:user', async (req, res) => {
  try {
    const data = await groupsModel.find({ owner_id: req.params.user });
    res.json(data);
  }
  catch (error) {
    res.status(500).json({ message: error.message })
  }

})

//Post Method
router.post('/create', async (req, res) => {
    const data = new groupsModel({
        owner_id: req.body.owner_id,
        owner: req.body.owner,
        groupname: req.body.groupname,
        private: req.body.private,
        type: req.body.type,
        status: req.body.status,
        createdby: req.body.owner,
        createddate: new Date(),
        updatedby: req.body.owner,
        updateddate: new Date(),
        members: req.body.members,
        lists: req.body.lists
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
