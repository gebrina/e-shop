export interface IOrder {
  id?: string;
  shippedDate?: string;
  orderDate?: string;
  requestedDate?: string;
  status?: number;
  address?: string;
  productPrice?: number;
}
