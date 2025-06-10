import { request } from "express";
import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    request: true,
  },
  password: {
    type: String,
    request: true,
  },
});
export const User = mongoose.model("User", userSchema);
