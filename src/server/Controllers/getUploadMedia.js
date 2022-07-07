const ImageModel = require("../Models/imageModel");
//Контроллер отправляет на фронтенд с БД список всех загруженных изображений в папке uploadMedia.
exports.getUploadMedia = (req, res) => {
  try {
    ImageModel.find({}, (error, result) => {
      if (error) throw error;
      res.send(result);
    });
  } catch (e) {
    res.status(400).send({ error: e });
  }
};
