import { IUser } from "../models/user.interface";
import { ICrud } from "./ICrud";

export interface IUserService extends ICrud<IUser> {
}
