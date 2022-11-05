//Контроллер загрузки изображения и ответа на фронтенд, связан с мидлвейром от Multer.
const fs = require("fs");

exports.uploadMediaController = async (req, res) => {
  let file = req.file;
  try {
    if (!file) {
      return res
        .status(400)
        .send({ message: "Загружаемый файл отсутствует!!!" });
    }
    const result = fs.readdirSync("./uploadMedia").map((image) => {
      return {
        name: image,
        path: `${process.env.URL_IMAGE}uploadMedia/${image}`,
      };
    });
    res.send(result);
  } catch (e) {
    res.status(409).send({ message: "Ошибка сохранения файла на сервере" });
  }
};
