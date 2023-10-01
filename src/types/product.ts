import { IProductCategory } from "./product-category";

export interface IProduct {
  name?: string;
  price?: number;
  description?: string;
  image?: string;
  category?: IProductCategory;
}
