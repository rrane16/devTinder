const mongoose = require("mongoose");

const connectDb = async () => {
  await mongoose.connect(
    "mongodb+srv://rupalirane16:m5IUkSy4IuA69QTt@cluster-node.m9aqd.mongodb.net/helloworld"
  );
};

module.exports = connectDb;
