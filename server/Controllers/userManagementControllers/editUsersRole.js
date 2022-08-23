const UserModel = require("../../Models/userModel");
exports.editUsersRole = async (req, res) => {
  try {
    const updateRole = new Promise((resolve, reject) => {
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
      return resolve();
    });

    updateRole
      .then(() => {
        return UserModel.find({}).populate("email", [
          "email",
          "role",
          "avatar",
          "agreeMailing",
        ]);
      })
      .then((usersList) => res.send(usersList));
  } catch (e) {
    e && res.status(402).send({ message: e });
  }
};
