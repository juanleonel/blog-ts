import { IAuthService } from "../interfaces/IAuthService";
import { Request, Response } from "express";

export class AuthController {
  private _authService: IAuthService;

  constructor(authService: IAuthService) {
    this._authService = authService;
  }

  signUp = async (req: Request, res: Response, next: any) => {
      try {
        const authResult = await this._authService.signUp(req.body);
        console.log(authResult);
    
        return res.render('create', { title: 'Create book', book: authResult });
      } catch (error) {
        next(error)
      }
    }
}
