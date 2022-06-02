const mongoose = require("mongoose");

const articlesSchema = mongoose.Schema({
  blockMenuName: String,
  category: [
    {
      name: String,
      articles: [
        {
          title: String,
          content: String,
        },
      ],
    },
  ],
});

module.exports = mongoose.model("articles", articlesSchema);
