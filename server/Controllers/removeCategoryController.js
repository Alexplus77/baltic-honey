const Category = require("../Models/categoryModel");
const Articles = require("../Models/articleModel");
//Контроллер удаляет в БД категорию и связанные с категорией статьи.
exports.removeCategory = (req, res) => {
  Articles.deleteMany({ category: req.body.id }, {}, (error) => {
    error && console.log("removeCategory", error);
  });
  Category.findByIdAndRemove(req.body.id, {}, (err, doc) => {
    doc && res.send("ok");
  });
};
