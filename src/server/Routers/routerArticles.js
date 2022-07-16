const express = require("express");
//ok
const router = express.Router();
const articlesPostControllers = require("../Controllers/articlesControllers/addArticlesController");
const addCategoryController = require("../Controllers/categoriesControllers/addCategoryController");
const getCategoriesController = require("../Controllers/categoriesControllers/getCategoriesController");
const getArticles = require("../Controllers/articlesControllers/getArticles");
const getBlockMenu = require("../Controllers/getBlockMenuControllers");
const getCategoriesMenu = require("../Controllers/categoriesControllers/getCategoriesMenu");
const removeArticle = require("../Controllers/articlesControllers/removeArticleController");
const updateArticle = require("../Controllers/articlesControllers/updateArticleController");
const removeCategory = require("../Controllers/categoriesControllers/removeCategoryController");
const updateCategory = require("../Controllers/categoriesControllers/updateCategoryController");
const removeUploadMedia = require("../Controllers/uploadMediaControllers/removeUploadMedia");
const uploadMedia = require("../Controllers/uploadMediaControllers/uploadMediaController");
const getUploadMedia = require("../Controllers/uploadMediaControllers/getUploadMedia");
const userRegistration = require("../Controllers/userRegistration");
const userAuthentication = require("../Controllers/userAuthentication");
const { userGetData } = require("../Controllers/userGetData");
const { requiredAuth } = require("../middlewares/requiredAuth");
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const { getAvatars } = require("../Controllers/getAvatars");

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
router.get("/getAvatars", getAvatars);
router.get("/userGetData", requiredAuth, userGetData);
router.post("/authentication", userAuthentication.userAuthentication);
router.post(
  "/uploadMedia",
  requiredAuth,
  upload.single("file"),
  uploadMedia.uploadMediaController
);
router.post("/userRegistration", userRegistration.userRegistration);
router.get(
  "/removeUploadMedia:name",
  requiredAuth,
  removeUploadMedia.removeUploadMedia
);
router.get("/getUploadMedia", getUploadMedia.getUploadMedia);
router.post("/updateCategory", requiredAuth, updateCategory.updateCategory);
router.post("/removeCategory", requiredAuth, removeCategory.removeCategory);
router.post("/updateArticle", requiredAuth, updateArticle.updateArticle);
router.get("/getCategoriesMenu/:id", getCategoriesMenu.getCategoriesMenu);
router.get("/getBlockMenu", getBlockMenu.getBlockMenu);
router.post(
  "/addArticle",
  requiredAuth,
  articlesPostControllers.articlesPostControllers
);
router.post("/addCategory", requiredAuth, addCategoryController.addCategory);
router.post("/removeArticle", requiredAuth, removeArticle.removeArticle);
router.get("/getCategories", getCategoriesController.getCategories);
router.get("/getArticles", getArticles.getArticles);
module.exports = router;
