import express from "express";
import cors from "cors";
// import mongoose from 'mongoose'
import dotenv from "dotenv";

dotenv.config();

let app = express();
app.use(cors());
app.use(express.json());

// mongoose.connect(process.env.MONGO_URI)
// .then(()=> console.log("MONGODB Connected...."))
// .catch(err=> console.log(err))

app.get("/", (req, res) => {
    console.log("Testing log")
  res.json("API is running....");
});

app.listen(5000, () => console.log("Server is running on port 5000...."));
