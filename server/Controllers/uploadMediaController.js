exports.uploadMediaController = (req, res) => {
  let file = req.file;
  console.log(file);
  if (!file) res.send("Ошибка при загрузке файла");
  else {
    res.send("Ok");
  }
};
