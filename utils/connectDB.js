import mongoose from "mongoose";

export default async function connectDB() {
  try {
    if (mongoose.connections[0].readyState) return;
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to DB");
  } catch (error) {
    console.error("Error connecting to DB", error);
  }
}
