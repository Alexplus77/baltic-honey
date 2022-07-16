const fs = require("fs");
const { v4: uuidv4 } = require("uuid");
const ImageModel = require("../Models/imageModel");
// Контроллер удаляет изображение и возвращает на фронтенд массив оставшихся изображений.

exports.removeUploadMedia = (req, res) => {
  const name = req.params.name;
  try {
    ImageModel.findOneAndRemove({ name: name }, {}, (err, doc) => {
      if (err) throw "Файл не найден";
      fs.unlink(`uploadMedia/${name}`, (err) => {
        if (err) throw "Файл не найден";
      });
      ImageModel.find({}, (error, result) => {
        if (error) throw "В базе данных такого изображения нет";
        res.send(result);
      });
    });
  } catch (e) {
    res.status(400).send({ message: e });
  }
};
