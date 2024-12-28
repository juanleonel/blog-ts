import mongoose from "mongoose";
import { IUser } from "./user.interface";

const userSchema = new mongoose.Schema({
  name: String,
  lastName: String,
  createdDate: Date,
  user: String,
  password: String,
  email: Date,
  isActive: Boolean
});

export const UserModel = mongoose.model<IUser>('user', userSchema);