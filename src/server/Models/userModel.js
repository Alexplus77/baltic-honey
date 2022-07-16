const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  email: { type: String, unique: true },
  password: String,
  role: String,
  avatar: String,
  agreeMailing: Boolean,
});

module.exports = mongoose.model("UserModel", UserSchema);
