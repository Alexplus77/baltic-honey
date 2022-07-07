const Articles = require("../Models/articleModel");
//Контроллер удаляет статью в БД
exports.removeArticle = (req, res) => {
  Articles.findByIdAndRemove(req.body.id, {}, (err, doc) => {
    doc && res.send("ok");
  });
};
