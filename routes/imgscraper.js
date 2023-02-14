var express = require('express');
var router = express.Router();
const linkPreviewGenerator = require("link-preview-generator");

router.get("/", async function (req, res) {
  const url = req.params.url;
  try {
    const previewData = await linkPreviewGenerator(url);
    console.log(previewData);
    res.send(previewData.img);
  } catch (error) {
    console.log(error);
    res.send("");
  }
 
});

module.exports = router;