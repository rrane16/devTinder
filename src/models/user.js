const { Schema } = require("mongoose");
const mongoose = require("mongoose");
var validator = require("validator");
var jwt = require("jsonwebtoken");

const userSchema = new Schema(
  {
    name: {
      type: String,
      validate(value) {
        return /^[a-zA-Z0-9]*$/.test(value);
      },
      minLength: [3, "very very short name"],
      maxLength: 12,
      required: true,
    },
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
      lowercase: true,
    },
    about: {
      type: String,
      default: "this is a defalut value for user",
    },
    city: { type: String },
    password: {
      type: String,
      required: true,
      validate: validator.isStrongPassword,
    },
    skills: { type: [String] },
  },
  {
    timestamps: true,
  }
);

userSchema.methods.getjwt = async function () {
  const user = this;
  const token = await jwt.sign({ _id: user._id }, "DEVTINDERKEY34", {
    expiresIn: "1d",
  });
  return token;
};

const model = mongoose.model("model", userSchema); // modelname, schem

module.exports = model;
