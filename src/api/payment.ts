import { IPayment } from "../types/Payment";
import axios from "./config";

export const getPayment = async (): Promise<IPayment[]> => {
  const response = await axios.get("/payment");
  return response.data;
};

export const deletePayment = async (id: string): Promise<string> => {
  const response = await axios.delete(`/payment/${id}`);
  return response.data;
};
