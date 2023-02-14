var express = require('express');
var router = express.Router();
const fs = require('fs');
const puppeteer = require('puppeteer');
const { exists } = require('../model/groupsmodel');
const url = 'https://www.lazada.com.ph/products/akko-ocean-star-3098b-mechanical-keyboard-akko-switch-jelly-white-i2547439806-s11802981662.html?clickTrackInfo=query%253Aakko%252Bmechanical%252Bkeyboard%253Bnid%253A2547439806%253Bsrc%253ALazadaMainSrp%253Brn%253A0ce547920e794c65f4fc2dbd4d6b81c9%253Bregion%253Aph%253Bsku%253A2547439806_PH%253Bprice%253A4499%253Bclient%253Adesktop%253Bsupplier_id%253A1000211236%253Basc_category_id%253A13853%253Bitem_id%253A2547439806%253Bsku_id%253A11802981662%253Bshop_id%253A386143&fastshipping=0&freeshipping=1&fs_ab=1&fuse_fs=1&lang=en&location=Metro%20Manila&price=4499&priceCompare=&ratingscore=5.0&request_id=0ce547920e794c65f4fc2dbd4d6b81c9&review=1&sale=6&search=1&source=search&spm=a2o4l.searchlist.list.i40.272c75805l8L3i&stock=1';


const util = require("util");
const request = util.promisify(require("request"));
const getUrls = require("get-urls");

const urlImageIsAccessible = async url => {
  const correctedUrls = getUrls(url);
  if (correctedUrls.size !== 0) {
    const urlResponse = await request(correctedUrls.values().next().value);
    const contentType = urlResponse.headers["content-type"];
    return new RegExp("image/*").test(contentType);
  }
};

const getImg = async (page, uri) => {
  const img = await page.evaluate(async () => {
    const ogImg = document.querySelector('meta[property="og:image"]');
    if (
      ogImg != null &&
      ogImg.content.length > 0 &&
      (await urlImageIsAccessible(ogImg.content))
    ) {
      return ogImg.content;
    }
    const imgRelLink = document.querySelector('link[rel="image_src"]');
    if (
      imgRelLink != null &&
      imgRelLink.href.length > 0 &&
      (await urlImageIsAccessible(imgRelLink.href))
    ) {
      return imgRelLink.href;
    }
    const twitterImg = document.querySelector('meta[name="twitter:image"]');
    if (
      twitterImg != null &&
      twitterImg.content.length > 0 &&
      (await urlImageIsAccessible(twitterImg.content))
    ) {
      return twitterImg.content;
    }

    let imgs = Array.from(document.getElementsByTagName("img"));
    if (imgs.length > 0) {
      imgs = imgs.filter(img => {
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
        if (img.naturalHeight <= 50 || img.naturalWidth <= 50) {
          addImg = false;
        }
        return addImg;
      });
      imgs.forEach(img =>
        img.src.indexOf("//") === -1
          ? (img.src = `${new URL(uri).origin}/${src}`)
          : img.src
      );
      return imgs[0].src;
    }
    return null;
  });
  return img;
};

router.get("/", function (req, res, next) {

  getImg(url,"lazada.com.ph")
});

module.exports = router;