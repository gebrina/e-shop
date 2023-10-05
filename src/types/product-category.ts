import { IProduct } from "./product";

export interface IProductCategory {
  id?: string;
  name?: string;
  description: string;
  products?: IProduct[];
}
