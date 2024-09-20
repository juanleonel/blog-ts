import { Request, Response } from "express";
import { IBookService } from "../interfaces/IBookService.interface";

export class BookController {
  private _bookService: IBookService;

  constructor(bookService: IBookService) {
    this._bookService = bookService;
  }

  create = async (req: Request, res: Response, next: any) => {
    const book = await this._bookService.getOne({ _id: req.params.id as string });
    console.log(book);

    return res.render('create', { title: 'Create book', book: book });
  }

  detail = async (req: Request, res: Response, next: any) => {
    throw new Error('Method not implemented.');
  }

  delete = async (req: Request, res: Response, next: any) => {
    throw new Error('Method not implemented.');
  }

  update = async (req: Request, res: Response, next: any) => {
    throw new Error('Method not implemented.');
  }

  submit = async (req: Request, res: Response, next: any) => {
    try {
      const id = req.query.id as string;
      let result;
  
      if (!id) {
        result = await this._bookService.add(req.body);
      } else {
        result = await this._bookService.update(id, req.body);
      }

      return res.redirect('/book');
    } catch (error) {
      next(error);
    }
  }

  index = async (req: Request, res: Response, next: any) => {
    try {
      const books = await this._bookService.find({}) || [];
      return res.render('index', { title: 'Home', books });
    } catch (error) {
      next(error);
    }
  }
}
