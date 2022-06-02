const mongoose = require("mongoose");
const BlockMenu = require("./blockMenuModel");

const CategorySchema = mongoose.Schema({
  blockMenu: { type: mongoose.Schema.Types.ObjectId, ref: BlockMenu },
  title: String,
});

module.exports = mongoose.model("CategoryModel", CategorySchema);
