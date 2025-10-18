const mongoose = require("mongoose");

//linkedInClone
mongoose
  .connect("mongodb://localhost:27017/linkedInClone")
  .then((res) => {
    console.log("MongoDB connected successfully");
  })
  .catch((err) => {
    console.log("MongoDB connection failed", err);
  });