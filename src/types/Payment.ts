import { IOrder } from "./Order";
import { IUser } from "./user";

export interface IPayment {
  amount: number;
  paymentDate: Date;
  order: IOrder;
  user: IUser;
}
