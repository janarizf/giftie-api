const multer = require("multer");
const { GridFsStorage } = require("multer-gridfs-storage");

var storage = new GridFsStorage({
  url: "mongodb+srv://admin:admin@giftie01.b3zn93e.mongodb.net/giftiedb",
  options: { useNewUrlParser: true, useUnifiedTopology: true },
  file: (req, file) => {
    const match = ["image/png", "image/jpeg"];

    if (match.indexOf(file.mimetype) === -1) {
      const filename = `${Date.now()}-${file.originalname}`;
      return filename;
    }

    return {
      bucketName: "images",
      filename: `${Date.now()}-${file.originalname}`
    };
  }
});

var uploadFiles = multer({ storage: storage }).array("image", 1);
module.exports = uploadFiles;
