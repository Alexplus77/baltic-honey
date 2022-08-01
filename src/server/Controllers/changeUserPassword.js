const userModel = require("../Models/userModel");
const bcrypt = require("bcryptjs");
const { mailSend } = require("../MailSendler/mailSend");
exports.changeUserPassword = async (req, res) => {
  try {
    const user = await userModel.findOne({ email: req.body.email });
    if (!bcrypt.compareSync(req.body.passwordOld, user.password))
      throw "Не правильно указан старый пароль";
    const hash = bcrypt.hashSync(req.body.passwordNew, 10);
    userModel.findOneAndUpdate(
      { email: req.body.email },
      { password: hash },
      { new: true },
      (err, doc) => {
        if (err) throw "Ошибка изменения пароля";
        res.send({ email: doc.email, avatar: doc.avatar, role: doc.role });
        mailSend(
          {
            avatar: doc.avatar,
            email: req.body.email,
            password: req.body.passwordNew,
          },
          "./mailChangePassword.html"
        );
      }
    );
  } catch (e) {
    res.status(404).send({ message: e });
  }
};
