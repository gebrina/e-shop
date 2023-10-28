import { IOrder } from "./Order";
import { IUser } from "./user";

export interface IPayment {
  id: string;
  amount: number;
  paymentDate: Date;
  order: IOrder;
  user: IUser;
}
