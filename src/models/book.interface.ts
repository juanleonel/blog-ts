import mongoose from "mongoose";

export interface Book extends mongoose.Document {
  author: string;
  createdDate: Date,
  title: string;
  isbn: string;
  releaseDate: Date,
}
