import { IBookService } from "../interfaces/IBookService.interface";
import { Book } from "../models/book.interface";
import { BookModel } from "../models/book.model";

export class BookService implements IBookService {
  add = async (book: Book): Promise<Book> => {
    try {
      const newBook = new BookModel();
      newBook.title = book.title;
      newBook.author = book.author;
      newBook.isbn = book.isbn;
      newBook.createdDate = new Date();
      newBook.releaseDate = book.releaseDate;

      return await newBook.save();
    } catch (error: any) {
      throw Error('Occurring an error while persists the book ' + error.message)
    }
  }

  find = async (query: object): Promise<Array<Book> | null | undefined> => {
    try {
      return await BookModel.find(query);
    } catch (error: any) {
      throw Error('Occurring an error while finding the book ' + error.message)
    }
  }

  update = async (id: string, book: Book): Promise<Book | null | undefined> => {
    try {
      const updateResult = await BookModel.findOneAndUpdate({
        _id: new Object(id)
      }, book);

      return updateResult;
    } catch (error: any) {
      throw Error('Occurring an error while updating the book ' + error.message)
    }
  }

  getOne = async (query: object): Promise<Book | null | undefined> => {
    return BookModel.findOne(query);
  }
}
