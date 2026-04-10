import mongoose from 'mongoose';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import Product from './models/Product.js';
import User from './models/User.js';
import products from '../src/data/products.js';

dotenv.config();

connectDB();

const importData = async () => {
  try {
    await Product.deleteMany();
    await User.deleteMany();

    // Create default admin user
    const adminUser = await User.create({
      name: 'Admin User',
      email: 'admin@example.com',
      password: 'password123',
      isAdmin: true,
    });

    // Map over products and remove integer id since mongo creates _id
    const sampleProducts = products.map((product) => {
      const { id, ...productWithoutId } = product;
      return productWithoutId;
    });

    await Product.insertMany(sampleProducts);

    console.log('Data Imported (Products & Admin User)!');
    process.exit();
  } catch (error) {
    console.error(`Error with data import: ${error.message}`);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await Product.deleteMany();
    await User.deleteMany();

    console.log('Data Destroyed!');
    process.exit();
  } catch (error) {
    console.error(`Error with data destroy: ${error.message}`);
    process.exit(1);
  }
};

if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}
