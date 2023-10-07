import { IProduct } from "./product";

export interface IUser {
  id?: string;
  username?: string;
  password?: string;
  email: string;
  products?: IProduct[];
}
