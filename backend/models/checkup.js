const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const checkup = new Schema(
  {},
  {
    timestamps: true,
    collection: "checkups",
    versionKey: false,
  }
);

const Checkups = mongoose.model("checkups", checkup);

module.exports = Checkups;
