const CategoryModel = require("../Models/categoryModel");
//Контроллер отправляет на фронтенд из БД массив всех категорий.
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
