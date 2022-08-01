const jwt = require("jsonwebtoken");
const UserModel = require("../../Models/userModel");

exports.userGetData = (req, res) => {
  const token = req.headers.authorisation.split(":")[1];
  jwt.verify(token, "Very secret word", {}, (err, decoded) => {
    if (decoded) {
      UserModel.findOne({ email: decoded.emailUser }, (error, result) => {
        if (error) {
          return res
            .status(404)
            .send({ message: "Ошибка в поиске базы данных" });
        }

        result?.email &&
          res.send({
            email: result.email,
            role: result.role,
            avatar: result.avatar,
          });
      });
    }
  });
};
