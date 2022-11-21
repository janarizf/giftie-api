var express = require('express');
var usersModel = require('../Model/usersmodel')
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

//Post Method
router.post('/post', async (req, res) => {
  const data = new usersModel({
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
    birthday: req.body.birthday,
    gender: req.body.gender,
    contactnumber: req.body.contactnumber,
    photo: req.body.photo,
    enabled: req.body.enabled,
    datejoined: req.body.datejoined,
    createdby: req.body.createdby,
    createddate: req.body.createddate,
    updatedby: req.body.updatedby,
    updateddate: req.body.updateddate
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
    const data = await usersModel.find();
    res.json(data);
}
catch(error){
    res.status(500).json({message: error.message})
}
 
})

//Get by ID Method
router.get('/getOne/:id',async  (req, res) => {
  try{
    const data = await usersModel.findById(req.params.id);
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

    const result = await usersModel.findByIdAndUpdate(
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
    const data = await usersModel.findByIdAndDelete(id)
    res.send(`Document with ${data.name} has been deleted..`)
}
catch (error) {
    res.status(400).json({ message: error.message })
}
})


module.exports = router;
