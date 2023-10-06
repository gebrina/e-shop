import { IProductCategory } from "./product-category";

export interface IProduct {
  name?: string;
  price?: number;
  description?: string;
  quantity?: number;
  image?: string;
  category?: IProductCategory;
}
