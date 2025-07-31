import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import path from 'path';
import cors from 'cors';
import connectDB from './config/dbConnet.js';
dotenv.config();
connectDB();

const app = express();
const PORT = process.env.PORT || 3000;

import { verifyJWT } from './middleware/authMiddleware.js';
import { verifyRole } from './middleware/verifyRoles.js';

import testRoute from './routes/testRoute.js'
import authRoute from './routes/authRoute.js'
import categoryRoute from './routes/categoryRoute.js';
import catalogRoutes from './routes/catalogRoute.js';
import borrowRoute from './routes/borrowRoute.js';

app.use(express.urlencoded({ extended: false }));
app.use(cors({ origin: '*' }));
app.use(express.json());

app.use('/uploads', express.static(path.resolve('uploads')));

app.use('/api/test', testRoute);
app.use('/api/auth', authRoute);
app.use(verifyJWT);
app.use('/api/category', categoryRoute);
app.use('/api/catalog', catalogRoutes);
app.use('/api/borrow', borrowRoute);

mongoose.connection.once('open', () => {
    console.log("Connected to MongoDB...");
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    })
});