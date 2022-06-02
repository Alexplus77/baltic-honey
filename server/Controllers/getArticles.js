const Articles = require("../Models/articleModel");

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
