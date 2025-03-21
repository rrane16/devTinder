const express = require("express");
const app = express();
const mongoose = require("mongoose");
const connectDb = require("./config/database");
const User = require("./models/user");
const { userAuth } = require("./middlewares/auth");
const { sample } = require("./middlewares/sample");

const cookieParser = require("cookie-parser");

app.use(express.json());
app.use(cookieParser());
app.use(express.static("images"));

//importing all the router
const authRouter = require("./router/auth");
const profileRouter = require("./router/profile");
const requestRouter = require("./router/request");
const userRouter = require("./router/user");

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);
app.use("/", sample);
//commenting below code becuase it will not let other router work all cases will fall in this case

// app.use((req, res) => {
//   res.send("Hi from server");
// });

app.all("/data/:id", (req, res) => {
  console.log("req.params", req.params);
  console.log("hostname", req.hostname);
  console.log("originalUrl", req.originalUrl);
  console.log("reqcookies", req.cookies);
  console.log("req.fresh", req.fresh);
  console.log("req.path", req.path);
  console.log("req.protocol", req.protocol);

  res.send("generic fucntion for all methods");
});

//res.send() and next combination present and there practice.

app.get(
  "/data",
  (req, res, next) => {
    //res.send("get call");
    next();
    next();
  },
  (req, res, next) => {
    console.log("second call");
    throw new Error("bad request");
    //res.send("get call second function");
    //next();
  }
);

app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

//c is optional

app.use("/abc?d", (req, res) => {
  res.send("match found");
});

//c can be many times or 1 time
app.use("/abc+d", (req, res) => {
  res.send("match found 2");
});

//there can be anyhting between j and d like abjd abjffffd
app.use("/abj*d", (req, res) => {
  res.send("match found 3");
});

//ad or aqed
app.use("/a(qe)?d", (req, res) => {
  res.send("mathc found 4");
});

//anything starting with n
app.use("/n/", (req, res) => {
  res.send("/n/");
});

//anything ending with fly

app.use("/*fly", (req, res) => {
  res.send("match found in reg");
});

// app.param("page", (req, res, next, page) => {
//   console.log("query param", req.query);
//   res.end("page data found");
//   next();
// });

app
  .route("/events")

  .get(function (req, res) {
    console.log("event route found");
    res.end("event route found");
  });

//find by iod and delete passing ID in param

// app.delete("/:id", async (req, res) => {
//   const userId = req.params.id;
//   console.log("id", userId);

//   try {
//     const user = await User.findByIdAndDelete(userId);
//     res.send("user deleted succesfully");
//   } catch (err) {
//     res.status(400).send(err.message);
//   }
// });

//find by id and delete passing id in req body
app.delete("/deleteUser", async (req, res) => {
  const userId = req.body.userId;
  console.log("id", userId);

  try {
    const user = await User.findByIdAndDelete(userId);
    res.send("user deleted succesfully");
  } catch (err) {
    res.status(400).send(err.message);
  }
});

//finding a particular user

app.get("/user", async (req, res) => {
  const username = req.body.name;
  console.log("username", username);

  try {
    const users = await User.find({ name: username });
    if (users.length === 0) {
      res.send("user not found");
    } else {
      res.send(users);
    }
  } catch (err) {
    res.status(400).send("user not found");
  }
});

app.get("/userstartswith", async (req, res) => {
  //const username = req.body.name;
  //console.lo"g("username", username);
  console.log("method called");

  try {
    const users = await User.$where('this.name.startsWith("d")');
    if (users.length === 0) {
      res.send("user not found");
    } else {
      res.send(users);
    }
  } catch (err) {
    res.status(400).send("user not found");
  }
});

//finding all users

app.get("/feed", async (req, res) => {
  const users = await User.find({});

  try {
    if (users.length === 0) {
      res.send("users not found");
    } else {
      res.send(users);
    }
  } catch (err) {
    res.status(400).send("something went wrong", err.message);
  }
});

app.patch("/user", async (req, res) => {
  const userId = req.body.userId;
  const data = req.body;

  try {
    const user = await User.findByIdAndUpdate(userId, data);
    console.log("user updated succesfully");
    res.send("user updated succesfully");
  } catch (err) {
    res.send(400, "user not updated", err.message);
  }
});

//connect to data base and if it is succesful then only start listening to server

connectDb()
  .then(() => {
    console.log("database connection establihsed");
    app.listen(7000, () => {
      console.log("hellooo");
    });
  })
  .catch((err) => {
    console.log("database connection error", err);
  });
