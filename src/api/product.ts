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

export const createProduct = async (product: IProduct): Promise<IProduct> => {
  const response = await axios.post("/products", product);
  return response.data;
};

export const deleteProduct = async (id: number): Promise<string> => {
  const response = await axios.delete(`/products/${id}`);
  return response.data;
};

export const updateProduct = async (product: IProduct) => {
  const response = await axios.put(`/products/${product.id}`, product);
  return response.data;
};
