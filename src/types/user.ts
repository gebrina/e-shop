import { IProduct } from "./product";

export interface IUser {
  username?: string;
  password?: string;
  email: string;
  products?: IProduct[];
}
