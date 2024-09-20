import { Request, Response } from 'express';
import { BookModel } from '../models/book.model';

/* GET home page. */
export function index(request: Request, response: Response, next: any) {
  return response.render('index', { title: 'Express 2' });
};

export async function list(request: Request, response: Response, next: any) {
  const books = await BookModel.find({});

  return response.render('index', { title: 'Books', books: books })
}

export function create(request: Request, response: Response, next: any) {
  return response.render('create', { title: 'Create Book' })
}

export async function submit(request: Request, response: Response, next: any) {
  try {
    const newBook = new BookModel();
    newBook.title = request.body.title;
    newBook.author = request.body.author;
    newBook.isbn = request.body.book_isbn;
    const book = await newBook.save();

    console.log(book);

    return response.redirect('/book');
  } catch (error) {
    return next(error);
  }
}
