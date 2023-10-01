import { IProductCategory } from "../types/product-category";
import axios from "./config";

export const getAllProducts = async (): Promise<IProductCategory[]> => {
  const response = await axios.get("/product-categories");
  return response.data;
};

export const getSingleProduct = async (
  id: number
): Promise<IProductCategory> => {
  const response = await axios.get(`/product-categories/${id}`);
  return response.data;
};

export const deleteProduct = async (id: number): Promise<string> => {
  const response = await axios.delete(`/product-categories/${id}`);
  return response.data;
};

export const updateProduct = async (id: number, product: IProductCategory) => {
  const response = await axios.put(`/product-categories/${id}`, product);
  return response.data;
};
