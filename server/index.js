const express = require("express");
const mongoose = require("mongoose");
const routers = require("./Routers/routerArticles");
const bodyParser = require("body-parser");
const path = require("path");
const app = express();
const cors = require("cors");
require("dotenv").config();
const PORT = process.env.PORT || 8080;
const URI = "mongodb://127.0.0.1/baltic-honey";
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(routers);
app.use(express.static(path.join(__dirname, "build")));
app.get("/*", (req, res) => {
  res.sendFile(`${__dirname}/build/index.html`);
});
// app.listen(PORT, () => console.log(`Server started on port: ${PORT}`));
mongoose
  .connect(URI)
  .then(() =>
    app.listen(PORT, () => console.log(`Server started on port: ${PORT}`))
  )
  .catch((e) => console.log(e));
