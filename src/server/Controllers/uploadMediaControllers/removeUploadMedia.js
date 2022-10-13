const fs = require("fs");
const { v4: uuidv4 } = require("uuid");
const ImageModel = require("../../Models/imageModel");
// Контроллер удаляет изображение и возвращает на фронтенд массив оставшихся изображений.

exports.removeUploadMedia = (req, res) => {
  const name = req.params.name;
  try {
    fs.unlink(`uploadMedia/${name}`, (err) => {
      if (err) {
        return res.status(402).send({ message: "Файл на сервере не найден" });
      }
      const result = fs.readdirSync("./uploadMedia").map((image) => {
        return {
          name: image,
          path: `${process.env.URL_IMAGE}uploadMedia/${image}`,
        };
      });
      res.send(result);
    });
  } catch (e) {
    res.status(400).send({ message: e });
  }
};
