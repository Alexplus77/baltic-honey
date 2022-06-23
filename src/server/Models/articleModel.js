const mongoose = require("mongoose");
const BlockMenu = require("./blockMenuModel");
const Categories = require("./categoryModel");

const ArticleSchema = mongoose.Schema({
  category: { type: mongoose.Schema.Types.ObjectId, ref: Categories },
  blockMenu: { type: mongoose.Schema.Types.ObjectId, ref: BlockMenu },
  title: String,
  content: String,
});

module.exports = mongoose.model("ArticleModel", ArticleSchema);
