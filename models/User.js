const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  PoneNumber:{type:Number,unique:true},
  password: String,
  role: { type: String, enum: ["user", "admin"], default: "user" },
});

module.exports = mongoose.model("User", UserSchema);
