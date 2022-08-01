const jwt = require("jsonwebtoken");
const UserModel = require("../Models/userModel");
exports.requiredAuth = (req, res, next) => {
  const token = req.headers.authorisation?.split(":")[1];
  jwt.verify(token, "Very secret word", {}, (err, decoded) => {
    if (err) {
      return res.status(409).send({ message: "Вы не авторизованы" });
    }
    if (decoded) {
      UserModel.findOne({ email: decoded.emailUser }, (error, result) => {
        if (error) {
          return res.status(409).send({ message: "Вы не авторизованы" });
        }
        if (result?.email) {
          if (result.password !== decoded.password) {
            return res.status(409).send({ message: "Вы не авторизованы" });
          }
          next();
        }
      });
    }
  });
};
