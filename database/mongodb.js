import mongoose from 'mongoose';
import { DATABASE_URI, NODE_ENV } from '../config/env.js';


if(!DATABASE_URI) {
  throw new Error('Please define the MONGODB_URI environment variable inside .env.<development/production>.local');
}

const connectToDatabase = async () => {
  try {
    await mongoose.connect(DATABASE_URI, {
      serverSelectionTimeoutMS: 5000, 
      bufferCommands: false,
    });

    console.log(`Connected to database in ${NODE_ENV} mode`);
  } catch (error) {
    console.error('Error connecting to database:', error);
    process.exit(1);
  }
};

export default connectToDatabase;