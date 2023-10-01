import { IProduct } from "../types/product";
import axios from "./config";

export const getAllProducts = async (): Promise<IProduct[]> => {
  const response = await axios.get("/products");
  return response.data;
};

export const getSingleProduct = async (id: number): Promise<IProduct> => {
  const response = await axios.get(`/products/${id}`);
  return response.data;
};

export const deleteProduct = async (id: number): Promise<string> => {
  const response = await axios.delete(`/products/${id}`);
  return response.data;
};

export const updateProduct = async (id: number, product: IProduct) => {
  const response = await axios.put(`/products/${id}`, product);
  return response.data;
};
