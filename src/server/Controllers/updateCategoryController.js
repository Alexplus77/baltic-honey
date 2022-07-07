const Categories = require("../Models/categoryModel");
// Контроллер обновляет в БД название категории.
exports.updateCategory = (req, res) => {
  Categories.findByIdAndUpdate(
    req.body.id,
    { title: req.body.category },
    {},
    (err) => {
      err && console.log("categoryUpdateErr", err);
      res.send("ok");
    }
  );
};
