const Categories = require("../Models/categoryModel");

exports.addCategory = (req, res) => {
  try {
    new Categories({
      blockMenu: req.body.menuBlock,
      title: req.body.category,
    }).save((error, result) => {
      res.send(result);
    });
  } catch (e) {}
};
