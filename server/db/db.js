import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
const mongoURI = process.env.MONGO_URI;

const mongoConnect = async () => {
  await mongoose.connect(mongoURI);

  mongoose.connection.on("connected", () => {
    console.log("Connected to MongoDB");
  });

  mongoose.connection.on("error", (err) => {
    console.log("Error while connecting to MongoDB:", err);
  });

  mongoose.connection.on("disconnected", () => {
    console.log("Disconnected from MongoDB");
  });
};

export default mongoConnect;
