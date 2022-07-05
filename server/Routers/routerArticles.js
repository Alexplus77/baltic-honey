const express = require("express");
//ok
const router = express.Router();
const articlesPostControllers = require("../Controllers/addArticlesController");
const addCategoryController = require("../Controllers/addCategoryController");
const getCategoriesController = require("../Controllers/getCategoriesController");
const getArticles = require("../Controllers/getArticles");
const getBlockMenu = require("../Controllers/getBlockMenuControllers");
const getCategoriesMenu = require("../Controllers/getCategoriesMenu");
const removeArticle = require("../Controllers/removeArticleController");
const updateArticle = require("../Controllers/updateArticleController");
const removeCategory = require("../Controllers/removeCategoryController");
const updateCategory = require("../Controllers/updateCategoryController");
const removeUploadMedia = require("../Controllers/removeUploadMedia");
const uploadMedia = require("../Controllers/uploadMediaController");
const getUploadMedia = require("../Controllers/getUploadMedia");
const multer = require("multer");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploadMedia");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage: storage });

router.post(
  "/uploadMedia",
  upload.single("file"),
  uploadMedia.uploadMediaController
);
router.get("/removeUploadMedia:name", removeUploadMedia.removeUploadMedia);
router.get("/getUploadMedia", getUploadMedia.getUploadMedia);
router.post("/updateCategory", updateCategory.updateCategory);
router.post("/removeCategory", removeCategory.removeCategory);
router.post("/updateArticle", updateArticle.updateArticle);
router.get("/getCategoriesMenu/:id", getCategoriesMenu.getCategoriesMenu);
router.get("/getBlockMenu", getBlockMenu.getBlockMenu);
router.post("/addArticle", articlesPostControllers.articlesPostControllers);
router.post("/addCategory", addCategoryController.addCategory);
router.post("/removeArticle", removeArticle.removeArticle);
router.get("/getCategories", getCategoriesController.getCategories);
router.get("/getArticles", getArticles.getArticles);
module.exports = router;
