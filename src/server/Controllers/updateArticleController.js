const Articles = require("../Models/articleModel");
exports.updateArticle = (req, res) => {
  console.log(req.body);
  Articles.findByIdAndUpdate(
    req.body.id,
    { title: req.body.title, content: req.body.content },
    {},
    () => res.send("ok")
  );
};
