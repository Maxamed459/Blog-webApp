import mongoose from "mongoose";
import { dbUrl } from "./config.js";
import chalk from "chalk";

const connectDB = async () => {
  try {
    // success
    await mongoose.connect(dbUrl);

    console.log(`${chalk.green.bold("Connected to MongoDB successfully!")}`);
  } catch (error) {
    // error message
    console.error("MongoDB connection error:", error.message);
    process.exit(1); // Exit the process with failure
  }
};

export default connectDB;
