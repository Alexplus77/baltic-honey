const UserModel = require("../Models/userModel");
exports.getUserList = async (req, res) => {
  try {
    const usersList = await UserModel.find({});
    const usersListSend = usersList.map((user) => {
      return { email: user.email, role: user.role, avatar: user.avatar };
    });
    res.send(usersListSend);
  } catch (e) {
    res.status(400).send({ message: "Ошибка отправки списка пользователей" });
  }
};
