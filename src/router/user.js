const express = require("express");

const userRouter = express.Router();

const { userAuth } = require("../middlewares/auth");

userRouter.get("/user", userAuth, async (req, res) => {
  console.log("user router");
});

module.exports = userRouter;
