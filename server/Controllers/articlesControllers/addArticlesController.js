const Articles = require("../../Models/articleModel");
//Контроллер сохраняет в базе данных статью
exports.articlesPostControllers = (req, res) => {
  try {
    new Articles({
      blockMenu: req.body.blockMenu,
      category: req.body.category,
      title: req.body.title,
      content: req.body.content,
    }).save(() => res.send("ok"));
  } catch (e) {
    console.log(e);
  }
};
