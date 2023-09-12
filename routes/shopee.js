var express = require('express');
var usersModel = require('../model/usersmodel')
var router = express.Router();
var bodyParser = require('body-parser')
var jsonParser = bodyParser.json();
const mongoose = require('mongoose');


router.get('/', function (req, res, next) {
    res.send('Shopee API');
});


//Post Method
router.post('/create', jsonParser, async (req, res) => {
    const appID = "13339830005";
    const secret = "RMBWCGIT56RXTMPHCXYAPRO4T6OIH6UY";
    //Set the API endpoint URL
    const url = "https://open-api.affiliate.shopee.ph/graphql";

    // Set the GraphQL query
    var payload = ""// { """{"query":"mutation{ generateShortLink(input: { originUrl: "https://shopee.ph/Apple-Iphone-11-128GB-Local-Set-i.52377417.6309028319", subIds: ["s1", "s2", "s3", "s4", "s5"] }){ shortLink }} "}"""};
    payload = payload.replace('\n', '');


    const timestamp = Date.now();
    const factor = appID + str(timestamp) + payload + secret;
    const signature = hashlib.sha256(factor.encode()).hexdigest();

    // Set the request headers
    const headers = {
        'Content-type': 'application/json',
        'Authorization': ''//f'SHA256 Credential={appID},Timestamp={timestamp},Signature={signature}'
    };

    // Send the POST request
    response = requests.post(url, payload, headers = headers)

    print(payload)
    print(response.json())

    try {
        const dataToSave = await data.save();
        res.status(200).json(dataToSave)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }

})


module.exports = router;
