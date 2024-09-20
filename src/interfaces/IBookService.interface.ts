import { Book } from "../models/book.interface";

export interface IBookService {
  add(body: Book): Promise<Book>;
  find(query?: object):  Promise<Array<Book> | null | undefined>;
  getOne(query?: object): Promise<Book | null | undefined>;
  update(id: string, body: any): Promise<Book | null | undefined>;
}