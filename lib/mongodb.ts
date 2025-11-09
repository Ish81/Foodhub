import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error("❌ Please define the MONGODB_URI environment variable in .env.local");
}

// Type assertion: MONGODB_URI is guaranteed to be a string after the check above
const MONGODB_URI_STRING = MONGODB_URI as string;

// Use global cache to prevent reinitialization during Next.js hot reloads
let cached = (global as any).mongoose;

if (!cached) {
  cached = (global as any).mongoose = { conn: null, promise: null };
}

export default async function connectDB() {
  if (cached.conn) {
    console.log("✅ Using existing MongoDB connection");
    return cached.conn;
  }

  if (!cached.promise) {
    console.log("🌍 Connecting to MongoDB...");
    cached.promise = mongoose
      .connect(MONGODB_URI_STRING, {
        bufferCommands: false,
        serverSelectionTimeoutMS: 5000, // timeout safety
      })
      .then((mongoose) => {
        console.log("✅ MongoDB connected successfully");
        return mongoose;
      })
      .catch((err) => {
        console.error("❌ MongoDB connection error:", err);
        throw err;
      });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}
