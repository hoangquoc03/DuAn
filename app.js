import express from "express";
import dotenv from "dotenv";
import connectDB from "./db/database.js";
const app = express();

dotenv.config();

connectDB();

const POST = process.env.PORT || 3000;

app.listen(POST, () => {
  console.log(`Server listen at port ${POST}`);
});
