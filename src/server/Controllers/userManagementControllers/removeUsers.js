const UserModel = require("../../Models/userModel");
exports.removeUsers = async (req, res) => {
  try {
    if (!req.body?.usersList) throw "Нет данных для удаления пользователей!!!";
    req.body?.usersList.forEach((user) =>
      UserModel.findOneAndRemove({ email: user }, {}, (err) => {
        if (err) throw "Ошибка удаления пользователей";
      })
    );

    const users = await UserModel.find({}).populate("email", [
      "email",
      "role",
      "avatar",
      "agreementMailing",
    ]);
    res.send(users);
  } catch (e) {
    e && res.status(402).send({ message: e });
  }
};
