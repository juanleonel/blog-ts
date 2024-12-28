import mongoose from 'mongoose';

export async function connect() {
  try {
    await mongoose.connect('mongodb://localhost:27017/books');
  } catch (error) {
    console.log(error)
  }
}
