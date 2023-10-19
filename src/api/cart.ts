import { ICart } from "../types/Cart";
import axios from "./config";

export const getAllCarts = async (): Promise<ICart[]> => {
  const response = await axios.get("/carts");
  return response.data;
};

export const updateCart = async (cart: ICart): Promise<ICart> => {
  const response = await axios.put(`/carts/${cart.id}`, cart);
  return response.data;
};

export const deleteCart = async (id: string): Promise<string> => {
  const response = await axios.delete(`/carts/${id}`);
  return response.data;
};

export const createCart = async (cart: ICart): Promise<ICart> => {
  const response = await axios.post("/carts", cart);
  return response.data;
};
