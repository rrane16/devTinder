const { Schema } = require("mongoose");
const mongoose = require("mongoose");

const userSchema = new Schema(
  {
    name: { type: String },
    lastName: { type: String },
    phone: {
      type: String,
      minLength: 9,
    },
    emailId: {
      type: String,
      unique: true,
    },
    about: {
      type: String,
      default: "this is a defalut value for user",
    },
    city: { type: String, required: true, default: "Mumbai" },
  },
  {
    timestamps: true,
  }
);

const model = mongoose.model("model", userSchema); // modelname, schem

module.exports = model;
