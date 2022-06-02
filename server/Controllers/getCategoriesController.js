const BlockMenuModel = require("../Models/blockMenuModel");
const CategoryModel = require("../Models/categoryModel");

exports.getCategories = (req, res) => {
  try {
    CategoryModel.find({})
      .populate([
        {
          path: "blockMenu",
          model: "BlockMenuModel",
        },
      ])
      .then((data) => res.send(data));
  } catch (e) {
    console.log("errorFromGetCategoriesController", e);
  }
};
