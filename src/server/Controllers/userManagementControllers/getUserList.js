const UserModel = require("../../Models/userModel");
exports.getUserList = async (req, res) => {
  try {
    const usersList = await UserModel.find({}).populate("email", [
      "email",
      "role",
      "avatar",
      "agreementMailing",
    ]);

    res.send(usersList);
  } catch (e) {
    res.status(400).send({ message: "Ошибка отправки списка пользователей" });
  }
};
