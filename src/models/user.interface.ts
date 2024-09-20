import mongoose from "mongoose";

export interface User extends mongoose.Document {
  name: string;
  lastName: string;
  createdDate: Date,
  user: string;
  password: string;
  email: Date;
  isActive: boolean;
}
