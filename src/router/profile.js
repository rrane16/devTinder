const express = require("express");
const User = require("../models/user");
const profileRouter = express.Router();
const { userAuth } = require("../middlewares/auth");
const { validateProfileEditData } = require("../utils/validation");
const validator = require("validator");
const bcrypt = require("bcrypt");
console.log("profile router file called");

profileRouter.patch("/profile", userAuth, async (req, res) => {
  // const allowedfields = ["name", "lastName", "about", "city"];

  // isUpdateAllowed = Object.keys(req.body).every((fields) =>
  //   allowedfields.includes(fields)
  // );

  try {
    if (!validateProfileEditData(req)) {
      throw new Error("data not valid");
    } else {
      console.log("valid data");
      const LoggedInUser = req.user;
      console.log("loggedInuser", LoggedInUser);
      Object.keys(req.body).forEach(
        (key) => (LoggedInUser[key] = req.body[key])
      );
      console.log("loggedInuser after update", LoggedInUser);

      LoggedInUser.save();

      res.send(200, "updated succesfully");
      //User.findOneAndUpdate({ emailId: LoggedInUser.emailId,req.body});
    }
  } catch (err) {
    console.log("error", err.message);
    res.send(400, "error while fetching profile data", err.message);
  }
});

//   try {

//     const user = req.user;
//     console.log("profile data read for", user.name);
//     res.send("profile data read");
//   } catch (err) {
//     res.send(400, "error while fetching profile data", err.message);
//   }

profileRouter.get("/profile", userAuth, async (req, res) => {
  //check if user is authnticated by userauth middleware

  try {
    const user = req.user;
    console.log("profile data read for", user.name);
    res.send("profile data read");
  } catch (err) {
    res.send(400, "error while fetching profile data", err.message);
  }
});

profileRouter.patch("/profile/password", userAuth, async (req, res) => {
  const allowedField = "password";
  const loggedInUser = req.user;
  const currentpassword = req.body[allowedField];
  console.log("loggedInUser", loggedInUser);
  // const ispasswordSame = bcrypt.compare(currentpassword, loggedInUser.password);

  //console.log("ispasswordSame", ispasswordSame);

  // check why it does not work
  // if (ispasswordSame) {
  //   console.log("same password");
  // } else {
  //   console.log("diffrent password");
  // }

  if (validator.isStrongPassword(currentpassword)) {
    const hashPassowrd = await bcrypt.hash(currentpassword, 10);

    console.log("hashPassowrd", hashPassowrd);
    loggedInUser[allowedField] = hashPassowrd;
    loggedInUser.save();
    res.send(200, "password updated succesfully");
  } else {
    res.send(400, "Not valid passowrd");
  }
});

module.exports = profileRouter;
