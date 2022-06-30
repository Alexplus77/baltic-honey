const fs = require("fs");
const { v4: uuidv4 } = require("uuid");

exports.getUploadMedia = (req, res) => {
  const files = fs.readdirSync("uploadMedia").map((elem) => {
    return {
      id: uuidv4(),
      name: elem,
      path: `${process.env.URL_IMAGE}/${elem}`,
    };
  });
  res.send(files);
};
