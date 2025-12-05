const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const library = new Schema(
  {},
  {
    timestamps: true,
    collection: "libraries",
    versionKey: false,
  }
);

const Library = mongoose.model("libraries", library);

module.exports = Library;
