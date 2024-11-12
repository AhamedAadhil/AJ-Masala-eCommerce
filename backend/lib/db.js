import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(
      process.env.NODE_ENV === "development"
        ? process.env.MONGODB_URI
        : process.env.MONGODB_URI_CLOUD
    );
    console.log(`MongoDB connected on ${conn.connection.host}`);
    // process.exit(0);
  } catch (error) {
    console.log(`Error connecting to MongoDB: ${error.message}`);
    process.exit(1);
  }
};
