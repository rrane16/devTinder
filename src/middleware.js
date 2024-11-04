const express = require("express");

const app = express();

//middleware to test if user is authorized or not
app.get("/admin", (req, res) => {
  const token = req.headers["authorization"];
  const bearer = token.split(" ");
  //console.log("token---->>", bearer[1]);
  const authToken = "xyz";
  if (bearer[1] === authToken) {
    res.send("authorized user");
  } else {
    res.send("unauthorized");
  }
});

app.listen(3000, () => {
  console.log("hello");
});
