const mongoose = require("mongoose");
//const User = require("../models/user");
const express = require("express");
const app = express();

const connectDb = async () => {
  await mongoose.connect(
    "mongodb+srv://rupalirane16:m5IUkSy4IuA69QTt@cluster-node.m9aqd.mongodb.net/user"
  );
};

console.log("database file called");

// app.post("/signup", async (req, res) => {
//   //creating instacnce of user model

//   const userObj = {
//     name: "gudda",
//     lastName: "singh",
//     phone: 808939393,
//     city: "pune",
//   };

//   const user = new User(userObj);

//   await user.save();
//   res.send("user added");
// });

module.exports = connectDb;
