const express = require("express");
const router = express.Router();
const articlesPostControllers = require("../Controllers/addArticlesController");
const addCategoryController = require("../Controllers/addCategoryController");
const getCategoriesController = require("../Controllers/getCategoriesController");
const getArticles = require("../Controllers/getArticles");
const getBlockMenu = require("../Controllers/getBlockMenuControllers");

router.get("/getBlockMenu", getBlockMenu.getBlockMenu);
router.post("/addArticle", articlesPostControllers.articlesPostControllers);
router.post("/addCategory", addCategoryController.addCategory);
router.get("/getCategories", getCategoriesController.getCategories);
router.post("/getArticles", getArticles.getArticles);
module.exports = router;
