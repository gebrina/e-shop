export interface IOrder {
  id?: string;
  shippedDate?: Date;
  orderDate?: Date;
  requestedDate?: Date;
  status?: number;
  address?: string;
  productPrice?: number;
}
