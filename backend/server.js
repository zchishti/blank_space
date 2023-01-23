import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';
import googleAuthRoutes from './routes/googleAuth.js';
import cookieParser from "cookie-parser";

dotenv.config()

const app = express();

app.use(express.json());

app.use(
    cors({
      // Sets Access-Control-Allow-Origin to the UI URI
      origin: process.env.CLIENT_ROOT_URI,
      // Sets Access-Control-Allow-Credentials to true
      credentials: true,
    })
  );
  
app.use(cookieParser());

app.get('/', (req, res) => {
    res.send('hello world')
})

app.use('/api/auth',googleAuthRoutes);

connectDB();

const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`App running in ${process.env.NODE_ENV} mode on port ${PORT}`));