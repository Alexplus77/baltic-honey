const Articles = require("../Models/articleModel");
exports.updateArticle = (req, res) => {
  Articles.findByIdAndUpdate(req.body.id, { content: req.body.content });
};
