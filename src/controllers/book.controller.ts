import { Request, Response } from "express";
import { body, validationResult } from "express-validator";
import { IBookService } from "../interfaces/IBookService.interface";

export class BookController {
  private _bookService: IBookService;

  constructor(bookService: IBookService) {
    this._bookService = bookService;
  }

  create = async (req: Request, res: Response, next: any) => {
    try {
      const book = await this._bookService.getOne({ _id: req.params.id as string });
  
      return res.render('create', { title: 'Create book', book: book });
    } catch (error) {
      next(error)
    }
  }

  detail = async (req: Request, res: Response, next: any) => {
    throw new Error('Method not implemented.');
  }

  delete = async (req: Request, res: Response, next: any) => {
    try {
      const { id } = req.params;
      this._bookService.delete(id.toString());

      return res.redirect('/book');
    } catch (error) {
      next(error)
    }
  }

  update = async (req: Request, res: Response, next: any) => {
    throw new Error('Method not implemented.');
  }

  submit = async (req: Request, res: Response, next: any) => {
    try {
      const { id } = req.query;
      let result;

      if (!id) {
        result = await this._bookService.add(req.body);
      } else {
        result = await this._bookService.update(id.toString(), req.body);
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
