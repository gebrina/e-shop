import { ICart } from "./Cart";
import { IUser } from "./user";

export interface IOrder {
  id?: string;
  shippedDate?: string | Date;
  orderDate?: string | Date;
  requestedDate?: string | Date;
  status?: number;
  address?: string;
  productPrice?: number;
  user?: IUser;
  cart?: ICart;
}
