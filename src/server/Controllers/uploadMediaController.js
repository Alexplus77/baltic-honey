//Контроллер загрузки изображения и ответа на фронтенд, связан с мидлвейром от Multer.
const ImageModel = require("../Models/imageModel");

exports.uploadMediaController = async (req, res) => {
  let file = req.file;
  try {
    if (!file) {
      return res.status(400).send({ message: "Файл отсутствует" });
    }
    const image = await ImageModel.findOne({ name: file.originalname });
    if (image) throw "Файл с таким именем уже существует";
    new ImageModel({
      name: file.originalname,
      path: `${process.env.URL_IMAGE}${file.path}`,
      size: file.size,
      create: new Date().toISOString(),
    }).save(() =>
      ImageModel.find({}, (error, result) => {
        res.send(result);
      })
    );
  } catch (e) {
    res.status(409).send({ message: e });
  }
};
