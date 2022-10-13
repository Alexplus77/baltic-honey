const fs = require("fs");

// Контроллер удаляет изображение и возвращает на фронтенд массив оставшихся изображений.

exports.removeUploadedSliderMedia = (req, res) => {
  const name = req.params.name;
  try {
    fs.unlink(`SliderImg/${name}`, (err) => {
      if (err) {
        return res.status(402).send({ message: "Файл на сервере не найден" });
      }
      const result = fs.readdirSync("./SliderImg").map((image) => {
        return {
          name: image,
          path: `${process.env.URL_IMAGE}SliderImg/${image}`,
        };
      });
      res.send(result);
    });
  } catch (e) {
    res.status(400).send({ message: e });
  }
};
