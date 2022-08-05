const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  email: { type: String, unique: true },
  password: String,
  role: String,
  avatar: String,
  agreementMailing: Boolean,
});

module.exports = mongoose.model("UserModel", UserSchema);
