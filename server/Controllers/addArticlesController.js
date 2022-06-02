const Articles = require("../Models/articleModel");
exports.articlesPostControllers = (req, res) => {
  try {
    new Articles({
      blockMenu: req.body.blockMenu,
      category: req.body.category,
      title: req.body.title,
      content: req.body.content,
    }).save();
  } catch (e) {
    console.log(e);
  }
};
