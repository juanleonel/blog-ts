import { IUserService } from "../interfaces/IUserService";
import { UserModel } from "../models/user.model";
import { IUser } from "../models/user.interface";

export class UserService implements IUserService {
  add = async (user: IUser): Promise<IUser> => {
    try {
      const item = new UserModel();
      item.name = user.name;
      item.lastName = user.lastName;
      item.createdDate = new Date();
      item.user = user.user;
      item.password = user.password;
      item.email = user.email;
      item.isActive = true;

      return await item.save();
    } catch (error: any) {
      throw Error('Occurring an error while persists the user ' + error.message)
    }
  }

  find = async (query: object): Promise<Array<IUser> | null> => {
    try {
      return await UserModel.find(query);
    } catch (error: any) {
      throw Error('Occurring an error while finding the book ' + error.message)
    }
  }

  update = async (id: string, book: IUser): Promise<IUser | null> => {
    try {
      const updateResult = await UserModel.findOneAndUpdate({
        _id: new Object(id)
      }, book);

      return updateResult;
    } catch (error: any) {
      throw Error('Occurring an error while updating the book ' + error.message)
    }
  }

  getOne = async (query: object): Promise<IUser | null> => {
    return UserModel.findOne(query);
  }

  delete = async (id: string): Promise<IUser | null> => {
    try {
      return UserModel.findByIdAndDelete(new Object(id))
    } catch (error: any) {
      throw Error('Occurring an error while deleting the book ' + error.message)
    }
  }
}
