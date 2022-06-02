const mongoose = require("mongoose");
const Articles = require("../Models/articlesModel");
exports.articlesPostControllers = (req, res) => {
  try {
    console.log(req.body);
    const article = new Articles(req.body);
    article.save((error, result) => {
      error && console.log("errorAdd", error);
      console.log("resultAdd", result);
    });
  } catch (e) {
    console.log(e);
  }
};
