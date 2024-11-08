const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  date_of_birth: { type: String, required: true },
  role: { type: String, required: true },
  location: { type: String, required: true },
  password: { type: String, required: true },
});

exports.UserModel = mongoose.model("user", userSchema);
