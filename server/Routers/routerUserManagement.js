const express = require("express");
const router = express.Router();

const { requiredAuth } = require("../middlewares/requiredAuth");
const {
  sendToUserMail,
} = require("../Controllers/userManagementControllers/sendToUserMail");
const {
  editUsersRole,
} = require("../Controllers/userManagementControllers/editUsersRole");
const {
  removeUsers,
} = require("../Controllers/userManagementControllers/removeUsers");
const {
  getUserList,
} = require("../Controllers/userManagementControllers/getUserList");
router.post("/sendMail", requiredAuth, sendToUserMail);
router.post("/editUsersRole", requiredAuth, editUsersRole);
router.post("/removeUsers", requiredAuth, removeUsers);
router.get("/getUsersList", requiredAuth, getUserList);

module.exports = router;
