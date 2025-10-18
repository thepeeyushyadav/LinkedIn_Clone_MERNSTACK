const mongoose = require("mongoose");

// Add a check to see if MONGODB_URI is loaded
if (!process.env.MONGODB_URI) {
  console.error("ERROR: MONGODB_URI is not defined in environment variables");
  process.exit(1);
}

mongoose
  .connect(process.env.MONGODB_URI, {
    retryWrites: true,
    w: 'majority'
  })
  .then((res) => {
    console.log("MongoDB connected successfully");
  })
  .catch((err) => {
    console.log("MongoDB connection failed", err);
  });