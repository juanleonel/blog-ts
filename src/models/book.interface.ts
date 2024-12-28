import mongoose from "mongoose";

export interface IBook extends mongoose.Document {
  author: string;
  createdDate: Date,
  title: string;
  isbn: string;
  releaseDate: Date | string,
}
