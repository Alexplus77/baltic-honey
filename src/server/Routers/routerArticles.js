const express = require("express");
const router = express.Router();

const articlesPostControllers = require("../Controllers/articlesControllers/addArticlesController");
const getArticles = require("../Controllers/articlesControllers/getArticles");
const getBlockMenu = require("../Controllers/userManagementControllers/getBlockMenuControllers");
const removeArticle = require("../Controllers/articlesControllers/removeArticleController");
const updateArticle = require("../Controllers/articlesControllers/updateArticleController");
const { requiredAuth } = require("../middlewares/requiredAuth");

router.post("/updateArticle", requiredAuth, updateArticle.updateArticle);
router.get("/getBlockMenu", getBlockMenu.getBlockMenu);
router.post(
  "/addArticle",
  requiredAuth,
  articlesPostControllers.articlesPostControllers
);
router.post("/removeArticle", requiredAuth, removeArticle.removeArticle);
router.get("/getArticles", getArticles.getArticles);

module.exports = router;
