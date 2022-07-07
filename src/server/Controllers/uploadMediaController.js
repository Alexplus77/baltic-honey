//Контроллер загрузки изображения и ответа на фронтенд, связан с мидлвейром от Multer.
const ImageModel = require("../Models/imageModel");
exports.uploadMediaController = (req, res) => {
  let file = req.file;
  if (!file) res.send("Ошибка при загрузке файла");
  else {
    new ImageModel({
      name: file.originalname,
      path: `${process.env.URL_IMAGE}${file.path}`,
      size: file.size,
      create: new Date().toISOString(),
    }).save(() => res.send("Ok"));
  }
};
