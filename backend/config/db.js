import mongoose from 'mongoose';
import dotenv from 'dotenv';

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
    console.log('mongodb is connected');
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1); //1 means exit with failure, 0 means success
  }
};
