import { IProductCategory } from "../types/product-category";
import axios from "./config";

export const getAllProducts = async (): Promise<IProductCategory[]> => {
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

export const deleteProduct = async (id: number): Promise<string> => {
  const response = await axios.delete(`/product-categories/${id}`);
  return response.data;
};

export const updateProdutCategory = async (
  id: number,
  product: IProductCategory
) => {
  const response = await axios.put(`/product-categories/${id}`, product);
  return response.data;
};
