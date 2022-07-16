const express = require("express");
const mongoose = require("mongoose");
const routers = require("./Routers/routerArticles");
const bodyParser = require("body-parser");
const path = require("path");
const app = express();
const cors = require("cors");
const fs = require("fs");
require("dotenv").config();
const PORT = process.env.PORT || 8080;
const URI2 = "mongodb://127.0.0.1/baltic-honey";
const URI =
  "mongodb+srv://alexsuf:A27021986@cluster0.3uuhf.mongodb.net/baltic-honey?retryWrites=true&w=majority";

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(routers);
app.use("/uploadMedia", express.static(path.join(__dirname, "uploadMedia")));
app.use("/avatars", express.static(path.join(__dirname, "avatars")));
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
