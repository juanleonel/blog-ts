import { Request, Response } from "express";
import { IUserService } from "../interfaces/IUserService";

export class AuthController {
  private _userService: IUserService;

  constructor(userService: IUserService) {
    this._userService = userService;
  }

  signUp = async (req: Request, res: Response, next: any) => {
    try {
      const authResult = await this._userService.add(req.body);
      return res.redirect("/");
      // return res.render('index', { title: 'Wellcome', item: authResult });
    } catch (error) {
      next(error)
    }
  }

  signIn = async (req: Request, res: Response, next: any) => {
    try {
      const user = await this._userService.getOne({ email: req.body.email });
      console.log(user);
      return res.redirect("/");
    } catch (error) {
      next(error)
    }
  }
}
