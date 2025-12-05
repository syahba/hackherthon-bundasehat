require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const user = require("./routes/user");
const library = require("./routes/library");
const checkup = require("./routes/checkup");
const app = express();

app.use(cors());
app.use(express.json());

// routes
app.use("/api/users", user);
app.use("/api/libraries", library);
app.use("/api/checkup", checkup);

const PORT = process.env.PORT || 4000;
async function start() {
  await mongoose.connect(process.env.MONGO_URI, { dbName: "bundasehat" });
  app.listen(PORT, () => console.log("Server listening on", PORT));
}

start().catch((err) => {
  console.error(err);
  process.exit(1);
});