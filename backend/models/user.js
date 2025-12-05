const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const user = new Schema(
  {},
  {
    timestamps: true,
    collection: "users",
    versionKey: false,
  }
);

const User = mongoose.model("users", user);

module.exports = User;
