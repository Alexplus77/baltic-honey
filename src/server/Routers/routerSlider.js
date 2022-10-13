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
const upload = multer({ storage: storage });

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
  upload.single("file"),
  uploadMediaSliderController
);
module.exports = router;
