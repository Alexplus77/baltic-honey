const express = require("express");
const {
  getImagesSlider,
} = require("../Controllers/sliderControllers/getImagesSlider");
const { requiredAuth } = require("../middlewares/requiredAuth");

const multer = require("multer");
const fs = require("fs");
const path = require("path");
const {
  getUploadedSliderMedia,
} = require("../Controllers/sliderControllers/getUploadedSliderMedia");
const {
  uploadMediaSliderController,
} = require("../Controllers/sliderControllers/uploadMediaSliderController");
const {
  removeUploadedSliderMedia,
} = require("../Controllers/sliderControllers/removeUploadedSliderMedia");
const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (!fs.existsSync(path.join("./SliderImg"))) {
      fs.mkdirSync(path.join("./SliderImg"));
    }
    cb(null, "./SliderImg");
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
      if (fs.existsSync(`./SliderImg/${file.originalname}`)) {
        return cb(`Файл ${file.originalname} уже существует`);
      } else {
        return cb(null, true);
      }
    }
  },
}).single("file");

router.get("/imageSlider:index", getImagesSlider);
router.get("/getUploadedSliderMedia", getUploadedSliderMedia);
router.get(
  "/removeUploadSliderMedia:name",
  requiredAuth,
  removeUploadedSliderMedia
);
router.post(
  "/uploadSliderMedia",
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
  uploadMediaSliderController
);
module.exports = router;
