import { ICart } from "./Cart";
import { IUser } from "./user";

export interface IOrder {
  id?: string;
  shippedDate?: string;
  orderDate?: string;
  requestedDate?: string;
  status?: number;
  address?: string;
  productPrice?: number;
  user?: IUser;
  cart?: ICart;
}
