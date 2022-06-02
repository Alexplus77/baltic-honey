const BlockMenuModel = require("../Models/blockMenuModel");
const CategoryModel = require("../Models/categoryModel");

exports.getCategories = (req, res) => {
  // BlockMenuModel.findOne({ title: "navbar" }, (error, result) => {
  //   !result && new BlockMenuModel({ title: "navbar" }).save();
  // });
  // BlockMenuModel.findOne({ title: "menuAside" }, (error, result) => {
  //   !result && new BlockMenuModel({ title: "menuAside" }).save();
  // });

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
