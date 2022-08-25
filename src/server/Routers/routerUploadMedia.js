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
const upload = multer({ storage: storage });

router.post(
  "/uploadMedia",
  requiredAuth,
  upload.single("file"),
  uploadMediaController
);
router.get("/removeUploadMedia:name", requiredAuth, removeUploadMedia);
router.get("/getUploadMedia", getUploadMedia);

module.exports = router;
