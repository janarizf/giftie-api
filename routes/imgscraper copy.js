var express = require('express');
var router = express.Router();

const fs = require('fs');
const util = require("util");
const request = util.promisify(require("request"));

const puppeteer = require("puppeteer-extra");
const pluginStealth = require("puppeteer-extra-plugin-stealth");
const linkPreviewGenerator = require("link-preview-generator");
var bodyParser = require('body-parser')
var jsonParser = bodyParser.json();


router.get("/getimg/:url", jsonParser, async function (req, res) {
  const website_url = req.params.url;
  //const website_url = "https://www.lazada.com.ph/products/charge-2-mini-portable-superbass-speaker-splashproof-wireless-bluetooth-speaker-smart-hi-fi-sound-powerful-sound-speaker-i3415034994-s17475253308.html?spm=a2o4l.home.just4u.14.58b7ca18DQgIuX&&scm=1007.17519.162103.0&pvid=8ee7b08d-e378-45ab-9690-d77f4c5a13ec&search=0&clickTrackInfo=pvid%3A8ee7b08d-e378-45ab-9690-d77f4c5a13ec%3Bchannel_id%3A0000%3Bmt%3Ahot%3Bitem_id%3A3415034994%3Bself_ab_id%3A162103%3Bself_app_id%3A7519%3Blayer_buckets%3A5437.25236_955.3631_6059.28889%3Bpos%3A13%3B";
  if (website_url == undefined) {
    res.send("");
  }
  else {
    puppeteer.use(pluginStealth());
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    page.setUserAgent("facebookexternalhit/1.1 (+http://www.facebook.com/externalhit_uatext.php)");
    // await page.setViewport({ width: 1366, height: 768 });
    await page.goto(website_url);
    await page.exposeFunction("request", request);
    // Wait for 5 seconds
    /* const data = await page.content();
     fs.writeFileSync('file.txt', data);
     const imgurl = await page.$eval("img", img => img.src)
     console.log(imgurl)*/
    // Take screenshot
    try {
      if (website_url.includes("shopee")) {
        var shopeeImg = await scrpShopee(page);
        await browser.close();
        res.send(shopeeImg);
      }
      else if (website_url.includes("lazada")) {
        var LazadaImg = await scrpLazada(page);
        await browser.close();
        res.send(LazadaImg);
      }
      else {
        const previewData = await linkPreviewGenerator(website_url);
        var previewImg = previewData.img;
        if (previewImg == null) {
            previewImg = await getImg(page, website_url);
        }
        await browser.close();
        res.send(previewImg);
      }
    }
    catch (error) {
      console.log(error)
      res.status(200).send();
    }
  }
});

const getImg = async (page, uri) => {
  try {


    const img = await page.evaluate(async () => {
      let imgs = Array.from(document.getElementsByTagName("img"));
      if (imgs.length > 0) {
        imgs = imgs.filter((img) => {
          let addImg = true;
          if (img.naturalWidth > img.naturalHeight) {
            if (img.naturalWidth / img.naturalHeight > 3) {
              addImg = false;
            }
          } else {
            if (img.naturalHeight / img.naturalWidth > 3) {
              addImg = false;
            }
          }
          if (img.naturalHeight <= 200 || img.naturalWidth <= 200) {
            addImg = false;
          }
          console.log("add img");
          return addImg;
        });
        if (imgs.length > 0) {
          imgs.forEach((img) =>
            img.src.indexOf("//") === -1
              ? (img.src = `${new URL(uri).origin}/${img.src}`)
              : img.src
          );
          console.log(imgs);
          console.log("img length");
          var num = 0;
          if (imgs.length > 1)
            num = 1;

          return imgs[num].src;
        }
      }
      return null;
    });
    return img;
  } catch (error) {
    console.log(error);
    return null;
  }
};
const scrpShopee = async (page) => {
  try {

    await page.waitForSelector('div.product-carousel div div.stardust-carousel__item-list-wrapper');

    const textContent = await page.evaluate(() => {
      return document.querySelector("div.product-carousel div div.stardust-carousel__item-list-wrapper ul li:nth-child(1) div div img").src;
    });

    return textContent;
  }
  catch (error) {
    console.log(error);
    return null;

  }
};

const scrpLazada = async (page) => {
  try {
    await page.waitForSelector('#module_item_gallery_1 div div.gallery-preview-panel');
    const textContent = await page.evaluate(() => {
      return document.querySelector('div.gallery-preview-panel div img.pdp-mod-common-image.gallery-preview-panel__image').src;
    });

    return textContent;
  }
  catch (error) {
    console.log(error);
    return null;

  }
};
/*(async () => {
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
      return imgList;
    } catch (error) {
      return error;
    }
  });

  res.send(getName);
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
 
      } 
  await page.goto("https://www.lazada.com.ph/products/yocaz-vegetable-chips-mix-vegetable-chips-dried-vegetables-snacks-vegetables-and-fruits-chips-dried-fruits-fruits-and-vegetables-chips-dried-fruits-and-vegetables-dried-vegetables-and-fruits-dried-vegetables-chips-250g-i3846546624-s21167741395.html?spm=a2o4l.home.flashSale.2.239eca18vl8ycR&search=1&mp=1&c=fs&clickTrackInfo=rs%3A0.2527588903903961%3Bfs_item_discount_price%3A164.68%3Bitem_id%3A3846546624%3Bpctr%3A0.2527588903903961%3Bcalib_pctr%3A0.0%3Bmt%3Ahot%3Bfs_utdid%3A-1%3Bfs_item_sold_cnt%3A46%3Babid%3A287818%3Bfs_item_price%3A339.00%3Bpvid%3Aaa6fcd75-f539-45e3-87bf-1fff615e5c41%3Bfs_min_price_l30d%3A0%3Bdata_type%3Aflashsale%3Bfs_pvid%3Aaa6fcd75-f539-45e3-87bf-1fff615e5c41%3Btime%3A1689262196%3Bfs_biz_type%3Afs%3Bscm%3A1007.17760.287818.%3Bchannel_id%3A0000%3Bfs_item_discount%3A51%25%3Bcampaign_id%3A232761&scm=1007.17760.287818.0");
  await browser.close();
})();*/

/* const getImg = (async () => {
 
 })
   (async () => {
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


module.exports = router;