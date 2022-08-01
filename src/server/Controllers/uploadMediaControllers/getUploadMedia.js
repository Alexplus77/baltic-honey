const fs = require("fs");

//Контроллер отправляет на фронтенд с БД список всех загруженных изображений в папке uploadMedia.
exports.getUploadMedia = (req, res) => {
  try {
    const images = fs.readdirSync("./uploadMedia").map((image) => {
      return {
        name: image,
        path: `${process.env.URL_IMAGE}uploadMedia/${image}`,
      };
    });
    res.send(images);
  } catch (e) {
    res.status(400).send({ error: e });
  }
};
