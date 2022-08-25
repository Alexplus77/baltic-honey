const express = require("express");
const router = express.Router();

const { requiredAuth } = require("../middlewares/requiredAuth");
const {
  changeUserPassword,
} = require("../Controllers/UserPanelControllers/changeUserPassword");
const {
  changeUserAvatar,
} = require("../Controllers/UserPanelControllers/changeUserAvatar");
const {
  userRegistration,
} = require("../Controllers/UserPanelControllers/userRegistration");
const {
  getAvatars,
} = require("../Controllers/UserPanelControllers/getAvatars");
const {
  userGetData,
} = require("../Controllers/UserPanelControllers/userGetData");
const {
  userAuthentication,
} = require("../Controllers/UserPanelControllers/userAuthentication");
const {
  getSiteRules,
} = require("../Controllers/getSiteRulesControllers/getSiteRulesController");

router.get("/getSiteRules/:file", getSiteRules);
router.post("/changePassword", requiredAuth, changeUserPassword);
router.post("/changeAvatar", requiredAuth, changeUserAvatar);
router.post("/userRegistration", userRegistration);
router.get("/getAvatars", getAvatars);
router.get("/userGetData", requiredAuth, userGetData);
router.post("/authentication", userAuthentication);

module.exports = router;
