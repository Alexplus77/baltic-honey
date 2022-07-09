const BlockMenu = require("../Models/blockMenuModel");
const BlockMenuModel = require("../Models/blockMenuModel");

//Контроллер отправляет на фронтенд из БД массив списка меню, если таковых нет, то создает их.
exports.getBlockMenu = (req, res) => {
  BlockMenuModel.findOne({ title: "navbar" }, (error, result) => {
    !result && new BlockMenuModel({ title: "navbar" }).save();
  });
  BlockMenuModel.findOne({ title: "menuAside" }, (error, result) => {
    !result && new BlockMenuModel({ title: "menuAside" }).save();
  });
  BlockMenu.find({}, (error, result) => {
    res.send(result);
  });
};
