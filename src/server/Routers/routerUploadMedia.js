const express = require("express");
const {
  removeUploadMedia,
} = require("../Controllers/uploadMediaControllers/removeUploadMedia");
const {
  uploadMediaController,
} = require("../Controllers/uploadMediaControllers/uploadMediaController");
const {
  getUploadMedia,
} = require("../Controllers/uploadMediaControllers/getUploadMedia");

const router = express.Router();
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const { requiredAuth } = require("../middlewares/requiredAuth");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (!fs.existsSync(path.join("./uploadMedia"))) {
      fs.mkdirSync(path.join("./uploadMedia"));
    }
    cb(null, "./uploadMedia");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (
      path.extname(file.originalname) !== ".jpg" &&
      path.extname(file.originalname) !== ".png"
    ) {
      return cb("Это не файл изображения, нужен файл в формате (jpg, png)");
    } else {
      if (fs.existsSync(`./uploadMedia/${file.originalname}`)) {
        return cb(`Файл ${file.originalname} уже существует`);
      } else {
        return cb(null, true);
      }
    }
  },
}).single("file");

router.post(
  "/uploadMedia",
  requiredAuth,
  (req, res, next) => {
    upload(req, res, (err) => {
      if (err) {
        return res.status(400).send({ message: err });
      } else {
        next();
      }
    });
  },
  uploadMediaController
);
router.get("/removeUploadMedia:name", requiredAuth, removeUploadMedia);
router.get("/getUploadMedia", getUploadMedia);

module.exports = router;
