const Categories = require("../Models/categoryModel");

exports.getCategoriesMenu = (req, res) => {
  Categories.find(
    {
      blockMenu: req.params.id,
    },
    (error, result) => {
      result && res.send(result);
    }
  );
};
