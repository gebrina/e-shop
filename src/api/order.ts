import { IOrder } from "../types/Order";
import axios from "./config";

export const createOrder = async (order: IOrder): Promise<IOrder> => {
  const response = await axios.post("/orders", order);
  return response.data;
};

export const updateOrder = async (order: IOrder): Promise<IOrder> => {
  const response = await axios.put(`/orders/${order.id}`, order);
  return response.data;
};

export const getAllOrders = async (): Promise<IOrder[]> => {
  const response = await axios.get("/orders");
  return response.data;
};

export const deleteOrder = async (id: string): Promise<string> => {
  const response = await axios.delete(`/orders/${id}`);
  return response.data;
};
