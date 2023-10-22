import { IOrder } from "./Order";
import { IProduct } from "./product";
import { IUser } from "./user";

export interface ICart {
  id?: string;
  total?: number;
  user?: IUser;
  products?: IProduct[];
  order?: IOrder[];
}
