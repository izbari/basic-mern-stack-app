const mongoose = require("mongoose");
const User = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    address: { type: String, required: true },

    birthdate: {
      type: Date,
      required: true,
      min: "1900-01-1",
      max: new Date().toLocaleDateString("en-CA"),
    },

    entranceDate: { type: Date, required: true },
  },
  { collection: "user-data" }
);

const model = mongoose.model("UserData", User);

module.exports = model;
