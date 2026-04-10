import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const dbURI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/e-store';
    console.log(`Connecting to MongoDB at: ${dbURI.replace(/:([^:@]{1,})@/, ':****@')}...`);
    const conn = await mongoose.connect(dbURI);
    console.log(`\x1b[32m%s\x1b[0m`, `✔ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`\x1b[31m%s\x1b[0m`, `✘ Error connecting to MongoDB: ${error.message}`);
    console.log('Please ensure MongoDB is running locally on port 27017.');
    process.exit(1);
  }
};

export default connectDB;
