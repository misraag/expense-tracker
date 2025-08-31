import express from "express";
import cors from "cors";
// import mongoose from 'mongoose'

import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRoutes from './routes/auth.js'
import expenseRoutes from './routes/expenses.js'

//load env variables
dotenv.config();

//connect database
connectDB();

let app = express();

//middlewares
app.use(cors());
app.use(express.json());

//routes
app.use('/api/auth', authRoutes)
app.use('/api/expenses', expenseRoutes)



app.get("/", (req, res) => {
    console.log("Testing log")
  res.json("API is running....");
});

const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log(`Server is running on port ${PORT}....`));
