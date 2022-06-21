const Categories = require("../Models/categoryModel");
exports.updateCategory = (req, res) => {
  console.log(req.body);
  Categories.findByIdAndUpdate(req.body.id, { title: req.body.title }, {}, () =>
    res.send("ok")
  );
};
