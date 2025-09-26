import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectDB = async () => {
  const uri = process.env.MONGO_URI;
  console.log("🔌 Loaded MONGO_URI:", uri);

  if (!uri) {
    console.error("❌ MONGO_URI is undefined. Check your .env file.");
    process.exit(1);
  }

  try {
    await mongoose.connect(uri);
    console.log("✅ MongoDB connected successfully");
  } catch (err) {
    console.error("❌ MongoDB connection error:", err.message);
    process.exit(1);
  }
};

export default connectDB;
