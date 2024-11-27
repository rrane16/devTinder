const express = require("express");

const app = express();

//middleware to test if user is authorized or not
app.get("/admin", (req, res, next) => {
  const token = req.headers["authorization"];
  const bearer = token.split(" ");
  //console.log("token---->>", bearer[1]);
  const authToken = "xyz";
  if (bearer[1] === authToken) {
    //pass contorl to next middleware function
    next();
  } else {
    //end the request response cycle
    res.send("unauthorized");
  }
});

app.get("/admin", (req, res) => {
  res.send("Get success");
});

app.listen(3000, () => {
  console.log("hello");
});
