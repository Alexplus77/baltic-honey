//Контроллер загрузки изображения и ответа на фронтенд, связан с мидлвейром от Multer.
const fs = require("fs");

exports.uploadMediaSliderController = async (req, res) => {
  let file = req.file;
  try {
    if (!file) {
      return res.status(400).send({ message: "Файл отсутствует" });
    }
    const result = fs.readdirSync("./SliderImg").map((image) => {
      return {
        name: image,
        path: `${process.env.URL_IMAGE}SliderImg/${image}`,
      };
    });
    res.send(result);
  } catch (e) {
    res.status(409).send({ message: "Ошибка сохранения файла на сервере" });
  }
};
