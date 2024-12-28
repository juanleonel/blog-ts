import { IBookService } from "../interfaces/IBookService.interface";
import { IBook } from "../models/book.interface";
import { BookModel } from "../models/book.model";

export class BookService implements IBookService {
  add = async (book: IBook): Promise<IBook> => {
    try {
      const newBook = new BookModel();
      newBook.title = book.title;
      newBook.author = book.author;
      newBook.isbn = book.isbn;
      newBook.createdDate = new Date();
      newBook.releaseDate = new Date(book.releaseDate).toISOString();

      return await newBook.save();
    } catch (error: any) {
      throw Error('Occurring an error while persists the book ' + error.message)
    }
  }

  find = async (query: object): Promise<Array<IBook> | null | undefined> => {
    try {
      return await BookModel.find(query);
    } catch (error: any) {
      throw Error('Occurring an error while finding the book ' + error.message)
    }
  }

  update = async (id: string, book: IBook): Promise<IBook | null | undefined> => {
    try {
      const updateResult = await BookModel.findOneAndUpdate({
        _id: new Object(id)
      }, book);

      return updateResult;
    } catch (error: any) {
      throw Error('Occurring an error while updating the book ' + error.message)
    }
  }

  getOne = async (query: object): Promise<IBook | null | undefined> => {
    return BookModel.findOne(query);
  }

  delete = async (id: string): Promise<IBook | undefined | null> => {
    try {
      return BookModel.findByIdAndDelete(new Object(id))
    } catch (error: any) {
      throw Error('Occurring an error while deleting the book ' + error.message)
    }
  }
}
