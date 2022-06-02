const Articles = require("../Models/articlesModel");

exports.getCategories = (req, res) => {
  // для первоночального создания blockMenuName раскоментировать

  try {
    Articles.find({}, {}, (error, result) => {
      error && console.log("errorGetCategories", error);
      // const response = result.reduce((acc, elem) => {
      //   if (elem.category.length) {
      //     acc[elem.blockMenuName] = elem.category.map((elem) => ({
      //       name: elem.name,
      //       id: elem._id,
      //     }));
      //   }
      //   return acc;
      // }, {});
      res.send(result);
    });
  } catch (e) {}
};
