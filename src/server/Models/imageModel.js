const mongoose = require("mongoose");
const imageSliderSchema = mongoose.Schema({
  name: { type: String, unique: true },
  path: String,
  article: String,
});

module.exports = mongoose.model("ImageSliderModel", imageSliderSchema);
