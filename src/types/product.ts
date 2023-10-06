import { IProductCategory } from "./product-category";
import { IUser } from "./user";

export interface IProduct {
  id?: string;
  name?: string;
  price?: number;
  description?: string;
  quantity?: number;
  image?: string;
  category?: IProductCategory;
  user?: IUser;
}
