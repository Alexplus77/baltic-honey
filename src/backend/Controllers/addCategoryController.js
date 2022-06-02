const Articles = require("../Models/articlesModel");

exports.addCategory = (req, res) => {
  console.log(req.body);
  Articles.findOne({ blockMenuName: req.body.menuBlock }, (error, result) => {
    !result && new Articles({ blockMenuName: req.body.menuBlock }).save();
    console.log(result);
  });

  try {
    Articles.findOneAndUpdate(
      { blockMenuName: req.body.menuBlock },
      {
        $push: {
          category: {
            name: req.body.category,
          },
        },
      },
      {
        insert: true,
      },
      (err, doc) => {
        err && console.log("errAddCategory", err);
        doc && res.status(200).send(doc);
      }
    );
  } catch (e) {}
};
