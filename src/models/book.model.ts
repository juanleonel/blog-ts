import mongoose from 'mongoose';
import { IBook } from './book.interface';

const bookSchema = new mongoose.Schema({
  title: String,
  author: String,
  isbn: String,
  createdDate: Date,
  releaseDate: Date,
});

export const BookModel = mongoose.model<IBook>('book', bookSchema);
