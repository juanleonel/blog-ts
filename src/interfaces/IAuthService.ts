import { IBook } from "../models/book.interface";

export interface IAuthService {
  login(body: any): Promise<object>;
  logout(body: object): Promise<void>;
  signUp(data: any): Promise<void>;
}
