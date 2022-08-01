const bcrypt = require("bcryptjs");
const UserModel = require("../Models/userModel");
const { mailSend } = require("../MailSendler/mailSend");
exports.userRegistration = async (req, res) => {
  try {
    const user = await UserModel.findOne({ email: req.body.email });
    if (user) throw "Такой пользователь уже существует";
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);
    new UserModel({ ...req.body, password: hash, role: "user" }).save(
      (error) => {
        res.send("ok");
        console.log(error);
      }
    );
    await mailSend(req.body, "./mail.html");
  } catch (e) {
    console.log(e);
    res.status(409).send({ message: e });
  }
};
