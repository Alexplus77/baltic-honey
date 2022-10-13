const fs = require("fs");

exports.getImagesSlider = (req, res) => {
  try {
    !fs.existsSync((__dirname, "SliderImg")) &&
      fs.mkdirSync((__dirname, "SliderImg"));
    const index = req.params.index;
    fs.readdir((__dirname, "SliderImg"), {}, (err, files) => {
      const sendImages = files.map(
        (file) => `${process.env.URL_IMAGE}sliderImg/${file}`
      );
      res.send({
        length: files.length,
        image: `${process.env.URL_IMAGE}sliderImg/${files[index]}`,
      });
    });
  } catch (e) {
    console.log(e);
  }
};
