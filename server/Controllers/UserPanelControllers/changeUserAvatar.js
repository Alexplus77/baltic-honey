const userModel = require("../../Models/userModel");
exports.changeUserAvatar = (req, res) => {
  try {
    userModel.findOneAndUpdate(
      { email: req.body.email },
      { ...req.body },
      { new: true },
      (err, doc) => {
        if (err) throw "Ошибка редактирования профиля";
        res.send({ email: doc.email, avatar: doc.avatar, role: doc.role });
      }
    );
  } catch (e) {
    res.status(404).send({ message: e });
  }
};
