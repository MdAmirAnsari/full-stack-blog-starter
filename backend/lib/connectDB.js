import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO);
    console.log("✅ MongoDB is connected");
  } catch (err) {
    console.log("❌ Connection Error:", err);
  }
};

export default connectDB;
