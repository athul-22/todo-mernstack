import express from 'express';
import mongoose from 'mongoose';
import  'dotenv/config';
import cors from 'cors'
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import allRoutes from './routes/index.js';


const PORT = process.env.PORT || 8000;

const app = express();

//middlewear
app.use(cors());
app.use(morgan('tiny'));
app.use(express.json());
app.use(cookieParser());

//routes
app.use('/api',allRoutes);

//Error Handler
app.use((err,req,res,next)=>{
    const status = err.status || 500;
    const message = err.message || 'Something went wrong';
    return res.status(status).json({message, stack:err.stack});
})

const connectDB = async () => {
    try {
      await mongoose.connect(process.env.DB_CONNECTION_STRING);
      console.log('Connected to the database');
    } catch (error) {
      console.error(error);
      process.exit(1);
    }
  };
  

app.listen(PORT, ()=> {
     connectDB();
    console.log(`Server is running in the port ${PORT}`);
});