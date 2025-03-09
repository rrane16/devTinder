const express = require("express");

const requestRouter = express.Router();

const { userAuth } = require("../middlewares/auth");

const ConnectionReqmodel = require("../models/connectionRequest");

const User = require("../models/user");
const authRouter = require("./auth");
const connectionReqmodel = require("../models/connectionRequest");
console.log("request router file called");

requestRouter.post(
  "/send/connectionRequest/:status/:userId",
  userAuth,
  async (req, res) => {
    try {
      console.log("request router user", req.user);
      const fromUserId = req.user._id;
      const ToUserId = req.params.userId;
      const status = req.params.status;

      console.log("send connection");
      console.log("touser", ToUserId);
      console.log("status", status);

      //accepted and rejected cannot be sent in this request

      const allowedFileds = ["ignored", "intrested"];

      if (!allowedFileds.includes(status)) {
        return res.send(400, "invalid status type");
      }

      //request to self not allowed
      if (fromUserId.equals(ToUserId)) {
        return res.send("request to self not allowed");
      }

      //check if toUser exist in DB

      const user = await User.findById(ToUserId);

      if (!user) {
        return res.send("User not found");
      }

      //check if same request or oppsite way req is sent again

      const exixtingConnectionRequest = await ConnectionReqmodel.findOne({
        $or: [
          { fromUserId, ToUserId },
          { fromUserId: ToUserId, ToUserId: fromUserId },
        ],
      });

      //list user who dont have city as noida

      myuser = await User.find({
        city: { $not: { $eq: "Noida" } },
      });

      console.log("myuser", myuser);

      if (exixtingConnectionRequest) {
        return res.send("duplicate request");
      }

      const connectionRequest = new ConnectionReqmodel({
        fromUserId,
        ToUserId,
        status,
      });

      const data = await connectionRequest.save();
      console.log("sending connection request for", fromUserId);
      res.send(200, "done sending connection request");
      //res.send("");
    } catch (err) {
      console.log("error while stroing conection request", err);
      res.send(400, "error while sending connection request", err.message);
    }
  }
);

requestRouter.post(
  "/review/connectionRequest/:status/:requestId",
  userAuth,
  async (req, res) => {
    try {
      const loggedinuser = req.user._id;
      const requestId = req.params.requestId;
      const status = req.params.status;

      //status cannot can be accepted and rejected only
      const allowedstatus = ["accepted", "rejected"];

      if (!allowedstatus.includes(status)) {
        return res.send("Not allowed");
      }

      const connection = await ConnectionReqmodel.findOne({
        _id: requestId,
      });

      if (!connection) {
        return res.send("connection requeast not found");
      }

      //status should be intrested only
      if (connection.status != "intrested") {
        return res.send("cannot review this request");
      }

      //only touserid person can accept the request
      if (!connection.ToUserId.equals(loggedinuser)) {
        return res.send("not allowed user");
      }

      //instead of above two check we can do below
      // const connectionReq = await connectionReqmodel.findOne({
      //   _id: requestId,
      //   ToUserId: loggedinuser,
      //   status: "intrested",
      // })

      console.log("connection", connection);

      connection.status = status;

      const data = await connection.save();
      res.send(200, "request status accepted");
    } catch (err) {
      console.log("eror in review req", err);
    }
  }
);

module.exports = requestRouter;
