const fs = require("fs");
const { v4: uuidv4 } = require("uuid");
exports.removeUploadMedia = (req, res) => {
  const name = req.params.name;
  try {
    fs.unlink(`uploadMedia/${name}`, (err) => {
      if (err) throw err;
      const files = fs.readdirSync("uploadMedia").map((elem) => {
        return {
          id: uuidv4(),
          name: elem,
          path: `${process.env.URL_IMAGE}/${elem}`,
        };
      });
      res.send(files);
    });
  } catch (e) {
    res.status(400).send({ error: e });
  }
};
