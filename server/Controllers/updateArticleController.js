const Articles = require("../Models/articleModel");
// Контроллер обновляет в БД контент и название статьи.
exports.updateArticle = (req, res) => {
  console.log(req.body);
  Articles.findByIdAndUpdate(
    req.body.id,
    { title: req.body.title, content: req.body.content },
    {},
    () => res.send("ok")
  );
};
