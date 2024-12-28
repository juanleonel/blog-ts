import { IBook } from "../models/book.interface";

export interface IBookService {
  add(body: IBook): Promise<IBook>;
  find(query?: object):  Promise<Array<IBook> | null | undefined>;
  getOne(query?: object): Promise<IBook | null | undefined>;
  update(id: string, body: any): Promise<IBook | null | undefined>;
  delete(id: string): Promise<IBook | null | undefined>;
}
