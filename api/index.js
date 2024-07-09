import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { error } from 'console';
dotenv.config();

mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log(`Connected to DB!`);
  })
  .catch((err) => {
    console.error(err);
  });

const app = express();

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
