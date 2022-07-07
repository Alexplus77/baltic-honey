const mongoose = require("mongoose");
const imageSchema = mongoose.Schema({
  name: String,
  path: String,
  size: Number,
  create: { type: Date, default: Date.now() },
});

module.exports = mongoose.model("ImageModel", imageSchema);
