const Category = require("../Models/categoryModel");
const Articles = require("../Models/articleModel");
exports.removeCategory = (req, res) => {
  Articles.deleteMany({ category: req.body.id }, {}, (error) => {
    error && console.log("removeCategory", error);
  });
  Category.findByIdAndRemove(req.body.id, {}, (err, doc) => {
    doc && res.send("ok");
  });
};
