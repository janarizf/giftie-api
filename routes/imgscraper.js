var express = require('express');
var router = express.Router();
const linkPreviewGenerator = require("link-preview-generator");

router.get("/", async function (req, res) {
  //const url = req.params.url;
  const url = "https://www.google.com/imgres?imgurl=https://assets-prd.ignimgs.com/2023/05/08/screen-shot-2023-05-08-at-2-40-49-pm-1683582062788.png&tbnid=0V1PCcr0jS7YjM&vet=1&imgrefurl=https://www.ign.com/articles/best-high-end-gaming-keyboard&docid=6CYxA2qQiU47-M&w=1780&h=724&source=sh/x/im/1"
  try {
    const previewData = await linkPreviewGenerator(url);
    console.log(previewData);
    if(previewData.img == null)
    {
      console.log("no image");
    }  
    res.send(previewData.img);
  } catch (error) {
    console.log(error);
    res.send("");
  }
 
});

module.exports = router;