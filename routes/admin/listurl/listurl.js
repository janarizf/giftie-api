var express = require('express');
var listurlmodel = require("../../../model/admin/listurlrequestmodel")
var router = express.Router();
var bodyParser = require('body-parser')
var jsonParser = bodyParser.json();

router.get('/', async function (req, res, next) {
    res.send('list url api');
});


router.get('/getbyid/:id', async (req, res) => {
    try {
        const data = await listurlmodel.findById(req.params.id);
        res.json(data);
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
});

//Post Method
router.post('/create', jsonParser, async (req, res) => {
    try {
        const data = new listurlmodel({
            listid: req.body.listid,
            originallink: req.body.originallink,
            requestedlink: req.body.requestedlink,
            linkstatus: req.body.linkstatus,
            requestedby: req.body.requestedby,
            requesteddate: req.body.requesteddate,
            approvedby: req.body.approvedby,
            approveddate: req.body.approveddate
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

        const result = await listurlmodel.findByIdAndUpdate(
            id, updatedData, options
        )

        res.send(result)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
});

module.exports = router;
