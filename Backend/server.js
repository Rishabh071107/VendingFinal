import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import './Config/db.js';


dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  console.log("Incoming Request:", req.method, req.url);
  next();
});


import userRoutes from './Routes/userRoutes.js';
import adminRoutes from './Routes/adminRoutes.js';
import productRoutes from './Routes/productRoutes.js';


app.use('/api/user', userRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/products', productRoutes);
app.use("/uploads", express.static("uploads"));


app.listen(9000, () => {
  console.log('Backend is listening at http://localhost:9000');
});
