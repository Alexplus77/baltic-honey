const express = require("express");
const router = express.Router();

const { requiredAuth } = require("../middlewares/requiredAuth");
const {
  removeCategory,
} = require("../Controllers/categoriesControllers/removeCategoryController");
const {
  updateCategory,
} = require("../Controllers/categoriesControllers/updateCategoryController");
const {
  getCategoriesMenu,
} = require("../Controllers/categoriesControllers/getCategoriesMenu");
const {
  addCategory,
} = require("../Controllers/categoriesControllers/addCategoryController");
const {
  getCategories,
} = require("../Controllers/categoriesControllers/getCategoriesController");

router.post("/updateCategory", requiredAuth, updateCategory);
router.post("/removeCategory", requiredAuth, removeCategory);
router.get("/getCategoriesMenu/:id", getCategoriesMenu);
router.post("/addCategory", requiredAuth, addCategory);
router.get("/getCategories", getCategories);

module.exports = router;
