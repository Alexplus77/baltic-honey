const UserModel = require("../../Models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
exports.userAuthentication = async (req, res) => {
  try {
    const user = await UserModel.findOne({ email: req.body.email });

    if (!user)
      throw "Пользователь с такой электронной почтой не зарегестрирован.";
    const isUser = bcrypt.compareSync(req.body.password, user.password);
    if (!isUser) throw "Не правильно введен пароль";
    if (isUser) {
      jwt.sign(
        { emailUser: user.email, password: user.password },
        "Very secret word",
        { expiresIn: "1h" },
        (err, token) => {
          if (err) throw "Ошибка создания токена";
          if (token) {
            res.send({ token: token });
          }
        }
      );
    }
  } catch (e) {
    res.status(404).send({ message: e });
  }
};
