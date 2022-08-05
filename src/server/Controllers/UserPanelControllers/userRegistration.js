const bcrypt = require("bcryptjs");
const UserModel = require("../../Models/userModel");
const { mailSend } = require("../../MailSendler/mailSend");
exports.userRegistration = async (req, res) => {
  try {
    await mailSend(req.body, "./mail.html").catch((e) => {
      if (e) throw e;
    });
    const user = await UserModel.findOne({ email: req.body.email });

    if (user) {
      throw "Такой пользователь уже существует";
    }

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);
    new UserModel({ ...req.body, password: hash, role: "user" }).save(
      (error) => {
        !error && res.send("ok");
        error && console.log(error);
      }
    );
  } catch (e) {
    res.status(404).send({ message: e });
  }
};
