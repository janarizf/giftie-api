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

router.get("/puppettest", jsonParser, async function (req, res) {
  const website_url = "https://www.lazada.com.ph/products/p9-wireless-bluetooth-headphones-with-mic-noise-cancelling-headsets-stereo-sound-earphones-sports-gaming-headphones-supports-tf-built-in-mic-noise-cancellation-bluetooth-headphones-music-play-wireless-headphone-i3437591126-s17627432388.html?spm=a2o4l.home.flashSale.4.239eca18z6rm8C&search=1&mp=1&c=fs&clickTrackInfo=rs%3A0.1976751834154129%3Bfs_item_discount_price%3A262.99%3Bitem_id%3A3437591126%3Bpctr%3A0.1976751834154129%3Bcalib_pctr%3A0.0%3Bmt%3Ai2i%3Bfs_utdid%3A-1%3Bfs_item_sold_cnt%3A20%3Babid%3A287818%3Bfs_item_price%3A499.00%3Bpvid%3Aea942512-e59b-4def-8c3c-f493dacc6aca%3Bfs_min_price_l30d%3A0%3Bdata_type%3Aflashsale%3Bfs_pvid%3Aea942512-e59b-4def-8c3c-f493dacc6aca%3Btime%3A1693465827%3Bfs_biz_type%3Afs%3Bscm%3A1007.17760.287818.%3Bchannel_id%3A0000%3Bfs_item_discount%3A47%25%3Bcampaign_id%3A241495&scm=1007.17760.287818.0";
  puppeteer.use(pluginStealth());
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--disable-setuid-sandbox',
      '--no-sandbox',
      '--disable-web-security']
  });
  try {
    const page = await browser.newPage();
    await page.setBypassCSP(true);
    page.setUserAgent("facebookexternalhit/1.1 (+http://www.facebook.com/externalhit_uatext.php)");
    await page.goto(website_url);
    await page.exposeFunction("request", request);


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
      console.log(previewImg);
      res.send(previewImg);
    }
  }
  catch (error) {
    console.log(error)
    res.status(500).send();
  }
});

router.get("/getimg/:url", jsonParser, async function (req, res) {
  const website_url = req.params.url;
  //const website_url = "https://www.lazada.com.ph/products/charge-2-mini-portable-superbass-speaker-splashproof-wireless-bluetooth-speaker-smart-hi-fi-sound-powerful-sound-speaker-i3415034994-s17475253308.html?spm=a2o4l.home.just4u.14.58b7ca18DQgIuX&&scm=1007.17519.162103.0&pvid=8ee7b08d-e378-45ab-9690-d77f4c5a13ec&search=0&clickTrackInfo=pvid%3A8ee7b08d-e378-45ab-9690-d77f4c5a13ec%3Bchannel_id%3A0000%3Bmt%3Ahot%3Bitem_id%3A3415034994%3Bself_ab_id%3A162103%3Bself_app_id%3A7519%3Blayer_buckets%3A5437.25236_955.3631_6059.28889%3Bpos%3A13%3B";
  if (website_url == undefined) {
    res.send("");
  }
  else {
    try {
      puppeteer.use(pluginStealth());
      const browser = await puppeteer.launch({
        headless: true,
        args: ['--no-sandbox',
          '--disable-web-security']
      });
      const page = await browser.newPage();
      await page.setBypassCSP(true);
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

      if (website_url.includes("shopee")) {
        var shopeeImg = await scrpShopee(page);
        console.log("shapee url - " + shopeeImg)
        await browser.close();
        if (shopeeImg) {
          res.send(shopeeImg);
        }
        else {
          res.status(200).send();
        }

      }
      else if (website_url.includes("lazada")) {
        var LazadaImg = await scrpLazada(page);
        console.log("lazada url - " + LazadaImg)
        await browser.close();
        if (LazadaImg) {
          res.send(LazadaImg);
        }
        else {
          res.status(200).send();
        }
      }
      else {
        const previewData = await linkPreviewGenerator(website_url);
        var previewImg = previewData.img;
        if (previewImg == null) {
          previewImg = await getImg(page, website_url);
        }
        await browser.close();
        if (previewImg) {
          console.log("img url - " + previewImg)
          res.send(previewImg);
        }
        else {
          res.status(200).send();
        }
      }

    }
    catch (error) {
      console.log("page error")
      console.log(error)
      res.status(500).send();
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
    console.log(img);
    return img;
  } catch (error) {
    console.log("image error");
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

    console.log("shapi - " + textContent);
    return textContent;
  }
  catch (error) {
    console.log("shopee error");
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
    console.log("lazada - " + textContent);
    return textContent;
  }
  catch (error) {
    console.log("lazada error");
    console.log(error);
    return null;

  }
};

module.exports = router;