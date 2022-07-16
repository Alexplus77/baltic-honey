const Categories = require("../../Models/categoryModel");
//Контроллер отправляет на фронтенд из БД список категорий указанного меню.
exports.getCategoriesMenu = (req, res) => {
  Categories.find(
    {
      blockMenu: req.params.id,
    },
    (error, result) => {
      result && res.send(result);
    }
  );
};
