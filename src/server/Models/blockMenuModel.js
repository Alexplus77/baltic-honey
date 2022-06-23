const mongoose = require("mongoose");

const BlockMenuSchema = mongoose.Schema({
  title: String,
});

module.exports = mongoose.model("BlockMenuModel", BlockMenuSchema);
