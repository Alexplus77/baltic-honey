const Articles = require("../Models/articleModel");
exports.removeArticle = (req, res) => {
  Articles.findByIdAndRemove(req.body.id, {}, (err, doc) => {
    doc && res.send("ok");
  });
};
