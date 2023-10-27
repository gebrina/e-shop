import { IOrder } from "./Order";
import { IUser } from "./user";

export interface IPayment {
  amount: number;
  createdAt: Date;
  order: IOrder;
  user: IUser;
}
