const express = require("express");
const router = express.Router();
const articlesPostControllers = require("../Controllers/articlesPostController");
const addCategoryController = require("../Controllers/addCategoryController");
const getCategoriesController = require("../Controllers/getCategoriesController");
router.post("/addArticle", articlesPostControllers.articlesPostControllers);
router.post("/addCategory", addCategoryController.addCategory);
router.get("/getCategories", getCategoriesController.getCategories);
module.exports = router;
