import { request } from "express";
import mongoose from "mongoose";
const todoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    request: true,
  },
});
export const Todo = mongoose.model("Todo", todoSchema);
