import { IProductCategory } from "../types/product-category";
import axios from "./config";

export const getAllProductCategories = async (): Promise<
  IProductCategory[]
> => {
  const response = await axios.get("/product-categories");
  return response.data;
};

export const getSingleProdutCategory = async (
  id: number
): Promise<IProductCategory> => {
  const response = await axios.get(`/product-categories/${id}`);
  return response.data;
};

export const createProductCategory = async (
  product: IProductCategory
): Promise<IProductCategory> => {
  const response = await axios.post("/product-categories", product);
  return response.data;
};

export const deleteProductCategory = async (id: string): Promise<string> => {
  const response = await axios.delete(`/product-categories/${id}`);
  return response.data;
};

export const updateProdutCategory = async (
  productCategory: IProductCategory
) => {
  const response = await axios.put(
    `/product-categories/${productCategory.id}`,
    productCategory
  );
  return response.data;
};
