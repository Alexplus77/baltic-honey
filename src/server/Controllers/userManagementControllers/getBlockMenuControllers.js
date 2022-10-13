const bcrypt = require("bcryptjs");
const BlockMenu = require("../../Models/blockMenuModel");
const BlockMenuModel = require("../../Models/blockMenuModel");
const UserModel = require("../../Models/userModel");

//Контроллер отправляет на фронтенд из БД массив списка меню, если таковых нет, то создает их.
//Также создает пользователя с ролью Суперадминистратор если такого нет.
exports.getBlockMenu = (req, res) => {
  UserModel.findOne({ role: "superAdmin" }, (error, result) => {
    if (!result?.email) {
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync("superAdmin", salt);
      new UserModel({
        email: "superAdmin@baltic-honey.ru",
        role: "superAdmin",
        password: hash,
      }).save((error) => error && console.log(error));
    }
  });
  BlockMenuModel.findOne({ title: "navbar" }, (error, result) => {
    !result?.title &&
      new BlockMenuModel({ title: "navbar" }).save(
        (error) => error && console.log(error)
      );
  });
  BlockMenuModel.findOne({ title: "menuAside" }, (error, result) => {
    !result?.title &&
      new BlockMenuModel({ title: "menuAside" }).save(
        (error) => error && console.log(error)
      );
  });
  BlockMenu.find({}, (error, result) => {
    res.send(result);
  });
};
