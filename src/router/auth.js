const express = require("express");

const authRouter = express.Router();

const User = require("../models/user");
const bcrypt = require("bcrypt");
console.log("auth file called");
const { postapivalidation } = require("../utils/validation");

authRouter.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;
    const user = await User.findOne({ emailId: emailId });
    console.log("login user", user);
    if (!user) {
      throw new Error("Invalid credentails");
    }
    console.log("login user", user);
    const ispasswordValid = bcrypt.compare(password, user.password);
    console.log("ispasswordValid", ispasswordValid);
    if (ispasswordValid) {
      // generate token

      const token = await user.getjwt();
      console.log("token", token);
      res.cookie("token", token);
      res.send("login succesfullyyyyyyyyyyyyyyyyyyyyy");
    } else {
      throw new Error("Invalid credentails");
    }
  } catch (err) {
    console.log("error", err.message);
    res.send(400, "invalid credentialssssss");
  }
});
authRouter.post("/signup", async (req, res) => {
  //creating instacnce of user model

  // const userObj = {
  //   name: "guddllla",
  //   lastName: "singh",
  //   phone: 808939393,
  //   city: "pune",
  // };    //now taking it from api

  //validation of data
  try {
    postapivalidation(req);

    //encrypting password

    //instaed of sending req.body directly sending only required fields
    const { name, phone, emailId, password, city } = req.body;

    const hashPassowrd = await bcrypt.hash(password, 10);

    console.log("hashPassowrd", hashPassowrd);

    const user = new User({
      name,
      phone,
      emailId,
      password: hashPassowrd,
      city: city,
    });
    await user.save();
    console.log("user added");
    return res.send("user added");
  } catch (err) {
    console.log("error", err.message);
    res.send(400, "error in saving user", err.message);
  }
});

authRouter.post("/logout", async (req, res) => {
  res.status(202).clearCookie("token").send("cookie cleared");
});

module.exports = authRouter;
