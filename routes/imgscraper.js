var express = require('express');
var router = express.Router();
const fs = require('fs');
const puppeteer = require('puppeteer');
const url = 'https://www.reddit.com';

router.get("/", function(req, res, next) {

(async () => {
    const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.setViewport({ width: 1366, height: 768});
  await page.goto("https://www.lazada.com.ph/products/logitech-k380-wireless-multi-device-keyboard-for-windows-apple-ios-apple-tv-android-or-chrome-bluetooth-compact-space-saving-design-pcmaclaptopsmartphonetablet-i567104790-s1542146147.html?clickTrackInfo=undefined&search=1&source=search&spm=a2o4l.searchlist.list.i40.50755844rmPCL3");
  // Wait for 5 seconds
  const data = await page.content();
    fs.writeFileSync('file.txt', data);
    const imgurl = await page.$eval("img", img => img.src)
    console.log(imgurl)
  // Take screenshot
  await browser.close();
})(); 
    

    res.send("API is working properly");
/* 
    (async () => {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();

        let counter = 0;
        page.on('response', async (response) => {
            const matches = /.*\.(jpg|png|svg|gif)$/.exec(response.url());
            console.log(matches);
            if (matches && (matches.length === 2)) {
              const extension = matches[1];
              const buffer = await response.buffer();
              fs.writeFileSync(`images/image-${counter}.${extension}`, buffer, 'base64');
              counter += 1;
            }
          });
      
        await page.goto("https://www.amazon.com/Piece-Samurai-Brook-Exclusive-Figure/dp/B0B3F6XHMM/ref=sr_1_17?crid=TY9VGX5TS7YZ&keywords=funko+one+piece&qid=1657725195&sprefix=funko+one+piec%2Caps%2C260&sr=8-17");
      
        await browser.close();
      })();   */
});

module.exports = router;