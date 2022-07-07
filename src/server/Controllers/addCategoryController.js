const Categories = require("../Models/categoryModel");
//Контроллер сохраняет в базе данных категорию
exports.addCategory = (req, res) => {
  try {
    new Categories({
      blockMenu: req.body.menuBlock,
      title: req.body.category,
    }).save((error, result) => {
      res.send(result);
    });
  } catch (e) {}
};
