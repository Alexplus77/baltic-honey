const Articles = require("../Models/articleModel");
//Контроллер отправляет на фронтенд из БД массив всех статей
exports.getArticles = (req, res) => {
  try {
    Articles.find({})
      .populate([
        {
          path: "blockMenu",
          model: "BlockMenuModel",
        },
        {
          path: "category",
          model: "CategoryModel",
        },
      ])
      .then((data) => res.send(data));
  } catch (e) {}
};
