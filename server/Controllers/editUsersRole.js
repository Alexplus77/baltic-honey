const UserModel = require("../Models/userModel");
exports.editUsersRole = async (req, res) => {
  try {
    req.body.usersList.forEach((user) =>
      UserModel.findOneAndUpdate(
        { email: user },
        { role: req.body.role },
        {},
        (err) => {
          if (err) throw "Ошибка обновления роли пользователей";
        }
      )
    );
    const usersList = await UserModel.find({}).populate("email", [
      "email",
      "role",
      "avatar",
      "agreeMailing",
    ]);
    res.send(usersList);
  } catch (e) {
    e && res.status(402).send({ message: e });
  }
};
