import mongoose from "mongoose";
import User from '../models/userModel.js';

const connectDB = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.DATABASE_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected successfully");
    // Create the empty User Collection
    await User.createCollection();
    console.log("User collection created Successfully");
  } catch (err) {
    console.log(err.message);
    process.exit(1); // Exit the process with failure
  }
};

export default connectDB;