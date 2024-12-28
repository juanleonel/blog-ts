import mongoose from "mongoose";

export interface IUser extends mongoose.Document {
  name: string;
  lastName: string;
  createdDate: Date | String,
  user: string;
  password: string;
  email: Date;
  isActive: boolean;
}
