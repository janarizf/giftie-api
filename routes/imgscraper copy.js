var express = require('express');
var router = express.Router();
const fs = require('fs');
const puppeteer = require('puppeteer');
const { exists } = require('../model/groupsmodel');
const url = 'https://www.reddit.com';

router.get("/", function (req, res, next) {

  /* (async () => {
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
  })();  */




  (async () => {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    let counter = 0;
    var imgList = [];

    var getName = page.on('response', async (response) => {
      try {
        if (counter <= 10) {
          const matches = /.*\.(jpg|webp)$/.exec(response.url());
          if (matches && (matches.length === 2)) {
            console.log(matches[0]);
            counter += 1;
            console.log(counter);
            imgList.push(matches[0]);

          }
        }
        else {
          res.send(JSON.parse(imgList));
          return imgList;
        }
      } catch (error) {
        return;
      }
    });


    /*   page.on('response', async (response) => {
        try {
          const matches = /.*\.(jpg|webp)$/.exec(response.url());
          if (matches && (matches.length === 2)) {
            console.log(matches[0]);
            counter += 1;
            console.log(counter);
            if (counter > 10) {
              return;
            }
            // const extension = matches[1];
            //  const buffer = await response.buffer();
            // console.log(buffer);
            // fs.writeFileSync(`images/image-${counter}.${extension}`, buffer, 'base64');
            //   counter += 1;
  
          }
  
  
        } catch {
  
        } */
    await page.goto("https://www.lazada.com.ph/products/macaron-e7s-tws-bluetooth-headphone-wireless-stereo-earphone-earbuds-ipx7-waterproof-sport-headset-led-display-i1178878328-s4138548509.html?clickTrackInfo=query%253AIn-Ear%252BHeadphones%253Bnid%253A1178878328%253Bsrc%253ALazadaMainSrp%253Brn%253Ad676d397083dc33dc2e56e0b12c02d7e%253Bregion%253Aph%253Bsku%253A1178878328_PH%253Bprice%253A100066706%253Bclient%253Adesktop%253Bsupplier_id%253A100066706%253Basc_category_id%253A7173%253Bitem_id%253A1178878328%253Bsku_id%253A4138548509%253Bshop_id%253A85939&fastshipping=0&freeshipping=0&fs_ab=1&fuse_fs=1&lang=en&location=Laguna&price=2.7E%202&priceCompare=&ratingscore=4.789912779673871&request_id=d676d397083dc33dc2e56e0b12c02d7e&review=2649&sale=13016&search=1&source=search&spm=a2o4l.store_product.list.i41.43f231b3atKCWH&stock=1");
    await browser.close();
  })();

  const getImg = (async () => {

  })
  /*  (async () => {
     let resultObj = {}
     let returnedResponse;
     let browser
     try {
       browser = await puppeteer.launch({
         headless: false,
         args: [
           '--no-sandbox',
           '--disable-setuid-sandbox',
           '--disable-infobars',
           '--disable-features=site-per-process',
           '--window-position=0,0',
           '--disable-extensions',
           '--user-agent="Mozilla/5.0 (Macintosh; Intel Mac OS X   10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3312.0    Safari/537.36"'
         ]
       });
       const page = await browser.newPage();
       await page.setViewport({ width: 1366, height: 800 });
       await page.goto('https://www.amazon.in/s?k=keyboard&tag=amdot-  21&ref=nb_sb_noss', { waitUntil: 'load', timeout: 30000 });
       await page.waitForSelector('#search > div.s-desktop-width-max')
       returnedResponse = await page.evaluate(() => {
         let elementArray = [];
         let dataArray = [];
         if (document.querySelectorAll('#search > div.s-desktop-width-max.s-desktop-content.sg-row > div.sg-col-20-of-24.sg-col-28-of-32.sg-col-16-of-20.sg-col.sg-col-32-of-36.sg-col-8-of-12.sg-col-12-of-16.sg-col-24-of-28 > div > span:nth-child(4) > div.s-main-slot.s-result-list.s-search-results.sg-row > div').length > 0) {
           let xyz = document.querySelectorAll('#search > div.s-desktop-width-max.s-desktop-content.sg-row> div.sg-col-20-of-24.sg-col-28-of-32.sg-col-16-of-20.sg-col.sg-col-32-of-36.sg-col-8-of-12.sg-col-12-of-16.sg-col-24-of-28> div > span:nth-child(4) > div.s-main-slot.s-result-list.s-search-results.sg-row > div')
           for (let divI = 3; divI < xyz.length - 4; divI++) {
             elementArray.push(xyz[divI])
           }
           let promise = new Promise((resolve, reject) => {
             setTimeout(() => {
               for (let text = 0; text < elementArray.length; text++) {
                 dataArray.push({
                   "ProductName": elementArray[text].querySelector('div > span > div > div > div  h2 > a > span').innerText,
                   "productURL": elementArray[text].querySelector('div > span > div > div > div  h2 > a ').href,
                   "productImg": elementArray[text].querySelector('div > span > div > div  span > a > div > img ').src,
                   "price": elementArray[text].querySelector('div > span > div > div span.a-price-whole') ? elementArray[text].querySelector('div > span > div > div span.a-price-whole').innerText.trim().replace(/\,/, "") : '0',
                   "strike": elementArray[text].querySelector('div > span > div > div span.a-price.a-text-price .a-offscreen') ? elementArray[text].querySelector('div > span > div > div span.a-price.a-text-price .a-offscreen').innerText.trim().substr(1, 9).replace(/\,/, "") : '0',
                   "rating": elementArray[text].querySelector('div > span > div > div a > i ') ? elementArray[text].querySelector('div > span > div > div a > i').innerText : "",
                   "offer": elementArray[text].querySelector('div > span > div > div > div.a-section.a-spacing-micro.s-grid-status-badge-container > a .a-badge .a-badge-text') ? elementArray[text].querySelector('div > span > div > div > div.a-section.a-spacing-micro.s-grid-status-badge-container > a .a-badge .a-badge-text').innerText : ''
                 })
                 resolve(dataArray)
               }
             }, 4000)
           })
           return promise;
         } else if (document.querySelectorAll('#search > div.s-desktop-width-max.s-opposite-dir > div > div.sg-col-20-of-24.s-matching-dir.sg-col-28-of-32.sg-col-16-of-20.sg-col.sg-col-32-of-36.sg-col-8-of-12.sg-col-12-of-16.sg-col-24-of-28 > div > span:nth-child(4) > div.s-main-slot.s-result-list.s-search-results.sg-row > div').length > 0) {
           let xyz = document.querySelectorAll('#search > div.s-desktop-width-max.s-opposite-dir > div > div.sg-col-20-of-24.s-matching-dir.sg-col-28-of-32.sg-col-16-of-20.sg-col.sg-col-32-of-36.sg-col-8-of-12.sg-col-12-of-16.sg-col-24-of-28 > div > span:nth-child(4) > div.s-main-slot.s-result-list.s-search-results.sg-row > div')
           for (let divI = 2; divI < xyz.length - 4; divI++) {
             elementArray.push(xyz[divI])
           }
           let promise = new Promise((resolve, reject) => {
             setTimeout(() => {
               for (let text = 0; text < elementArray.length; text++) {
                 dataArray.push({
                   "ProductName": elementArray[text].querySelector('div > span > div > div > div  h2 > a > span').innerText,
                   "productURL": elementArray[text].querySelector('div > span > div > div > div  h2 > a ').href,
                   "productImg": elementArray[text].querySelector('div > span > div > div  span > a > div > img ').src,
                   "price": elementArray[text].querySelector('div > span > div > div span.a-price-whole') ? elementArray[text].querySelector('div > span > div > div span.a-price-whole').innerText.trim().replace(/\,/, "") : '0',
                   "strike": elementArray[text].querySelector('div > span > div > div span.a-price.a-text-price .a-offscreen') ? elementArray[text].querySelector('div > span > div > div span.a-price.a-text-price .a-offscreen').innerText.trim().replace(/\,/, "").substr(1, 9) : '0',
                   "rating": elementArray[text].querySelector('div > span > div > div a > i ') ? elementArray[text].querySelector('div > span > div > div a > i').innerText : "",
                   "offer": elementArray[text].querySelector('div.a-section div.a-section span') ? elementArray[text].querySelector('div.a-section div.a-section span').innerText : ''
                 })
                 resolve(dataArray)
               }
             }, 4000)
           })
           return promise;
         }
       })
       resultObj.product = returnedResponse
       console.log(resultObj.product)
       await browser.close();
     }
     catch (e) {
       console.log('Amazon scrap error-> ', e);
       await browser.close();
     }
   })(); */

});

module.exports = router;