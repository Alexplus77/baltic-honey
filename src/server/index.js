const express = require("express");
const mongoose = require("mongoose");
const routers = require("./Routers/routerArticles");
const userRouters = require("./Routers/routerUsers");
const userManagementRouters = require("./Routers/routerUserManagement");
const categoriesRouter = require("./Routers/routerCategories");
const uploadMediaRouter = require("./Routers/routerUploadMedia");
const sliderRouter = require("./Routers/routerSlider");
const bodyParser = require("body-parser");
const path = require("path");
const app = express();
const cors = require("cors");

require("dotenv").config();
const PORT = process.env.PORT || 8080;
const URI = "mongodb://127.0.0.1:27017/baltic-honey";

const URI3 = "mongodb://127.0.0.1/baltic-honey";
const URI2 =
  "mongodb+srv://alexsuf:A27021986@cluster0.3uuhf.mongodb.net/baltic-honey?retryWrites=true&w=majority";

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(routers);
app.use(userRouters);
app.use(userManagementRouters);
app.use(categoriesRouter);
app.use(uploadMediaRouter);
app.use(sliderRouter);
app.use("/sliderImg", express.static(path.join(__dirname, "SliderImg")));
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
