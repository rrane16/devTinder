const express = require("express");

const app = express();

// app.use("/data", (req, res) => {
//   console.log("req", req);
//   res.send("data is fetched from server");
// });

//commenting below code becuase it will not let other router work all cases will fall in this case

// app.use((req, res) => {
//   res.send("Hi from server");
// });

app.all("/data/:id", (req, res) => {
  console.log("req.params", req.params);
  console.log("hostname", req.hostname);
  console.log("originalUrl", req.originalUrl);

  res.send("generic fucntion for all methods");
});

app.get(
  "/data",
  (req, res, next) => {
    //res.send("get call");
    next();
  },
  (req, res, next) => {
    console.log("second call");
    //res.send("get call second function");
    //next();
  }
);

app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

app.post("/data", (req, res) => {
  res.send("post call");
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
app.listen(3000, () => {
  console.log("hello");
});