const { Schema } = require("mongoose");
const mongoose = require("mongoose");
var validator = require("validator");

const userSchema = new Schema(
  {
    name: { type: String, minLength: 3, maxLength: 12, required: true },
    lastName: { type: String },
    phone: {
      type: String,
      minLength: 9,
      required: true,
      unique: true,
    },
    emailId: {
      type: String,
      unique: true,
      validate: validator.isEmail,
      trim: true,
      required: true,
    },
    about: {
      type: String,
      default: "this is a defalut value for user",
    },
    city: { type: String, required: true },
    password: {
      type: String,
      required: true,
      validate: validator.isStrongPassword,
    },
  },
  {
    timestamps: true,
  }
);

const model = mongoose.model("model", userSchema); // modelname, schem

module.exports = model;
