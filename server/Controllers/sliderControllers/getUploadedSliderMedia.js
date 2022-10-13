const fs = require("fs");

//Контроллер отправляет на фронтенд с сервера список всех загруженных изображений в папке uploadMedia.
exports.getUploadedSliderMedia = (req, res) => {
  try {
    const images = fs.readdirSync("./SliderImg").map((image) => {
      return {
        name: image,
        path: `${process.env.URL_IMAGE}SliderImg/${image}`,
      };
    });
    res.send(images);
  } catch (e) {
    console.log(e);
    res.status(400).send({ error: e });
  }
};
