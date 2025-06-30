import mongoose from "mongoose";

const connectDB = (uri) => {
  console.log("Connecting to DB....");
  return mongoose.connect(uri);
};

export default connectDB;
