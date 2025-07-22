import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import path from 'path';
import cors from 'cors';
import connectDB from './config/dbConnect.js';
dotenv.config();
connectDB();

const app = express();
const PORT = process.env.PORT || 3000;

import testRoute from './routes/testRoute.js'
import userRoute from './routes/userRoute.js'
import catalogRoutes from './routes/catalogRoute.js';
import categoryRoute from './routes/categoryRoute.js';

app.use(express.urlencoded({ extended: false }));
app.use(cors({ origin: '*' }));
app.use(express.json());

app.use('/uploads', express.static(path.resolve('uploads')));

app.use('/api/test', testRoute);
app.use('/api/user', userRoute);
app.use('/api/catalog', catalogRoutes);
app.use('/api/category', categoryRoute);

mongoose.connection.once('open', () => {
    console.log("Connected to MongoDB...");
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    })
});