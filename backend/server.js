import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';
import productRoutes from './routes/productRoutes.js';
import userRoutes from './routes/userRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import authRoutes from './routes/auth.js';
import Product from './models/Product.js';
import User from './models/User.js';
import products from '../src/data/products.js';

dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('API is running...');
});

app.get('/api/seed', async (req, res) => {
  try {
    await Product.deleteMany();
    await User.deleteMany();

    const adminUser = await User.create({
      name: 'Admin User',
      email: 'admin@example.com',
      password: 'password123',
      isAdmin: true,
    });

    const sampleProducts = products.map((product) => {
      const { id, ...productWithoutId } = product;
      return productWithoutId;
    });

    await Product.insertMany(sampleProducts);
    res.send('Data Imported (Products & Admin User) Successfully!');
  } catch (error) {
    res.status(500).send(`Error with data import: ${error.message}`);
  }
});

app.use('/api', authRoutes);
app.use('/api', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, '0.0.0.0', () => console.log(`Server running on port ${PORT}`));
