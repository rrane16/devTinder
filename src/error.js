const express = require("express");

const app = express();

app.get("/data", (req, res, next) => {
  try {
    throw new Error("BROKEN");
  } catch (err) {
    next(err);
  }
});

app.get("/data", (err, req, res, next) => {
  if (err) {
    res.status(500).send(err);
  }
});

app.listen(3000, () => {});
