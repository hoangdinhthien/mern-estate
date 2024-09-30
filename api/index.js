import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRouter from './routes/user.route.js';
import authRouter from './routes/auth.route.js';
import listingRouter from './routes/listing.route.js';
import cookieParser from 'cookie-parser';
import path from 'path';

// ----- CONFIGURATION -----
dotenv.config();

// ----- DATABASE CONNECTION -----
mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log(`Connected to DB!`);
  })
  .catch((err) => {
    console.error(err);
  });

// DYNAMIC DIRECTORY NAME
const __dirname = path.resolve();

// ----- SERVER -----
const app = express();

// ----- MIDDLEWARES -----
app.use(express.json());
app.use(cookieParser());

// ----- SERVER -----
app.listen(3000, () => {
  console.log('Server is running on port 3000 !');
});

// ----- ROUTES -----
app.use('/api/user', userRouter);
app.use('/api/auth', authRouter);
app.use('/api/listing', listingRouter);

// ----- SERVE STATIC FILES -----
app.use(express.static(path.join(__dirname, '/client/dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
});

// ----- ERROR HANDLER -----
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || `Internal server error !!!`;
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});
