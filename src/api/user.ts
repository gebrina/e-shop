import { IUser } from "../types/user";
import axios from "./config";

export const getAllUsers = async (): Promise<IUser[]> => {
  const response = await axios.get("/users");
  return response.data;
};

export const getOneUser = async (id: string): Promise<IUser> => {
  const response = await axios.get(`/users/${id}`);
  return response.data;
};

export const createUser = async (user: IUser): Promise<IUser> => {
  const response = await axios.post("/users", user);
  return response.data;
};
