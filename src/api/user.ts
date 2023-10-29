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

export const updateUser = async (user: IUser): Promise<IUser> => {
  const response = await axios.put(`/users/${user.id}`, user);
  return response.data;
};

export const deleteUser = async (id: string): Promise<string> => {
  const response = await axios.delete(`/users/${id}`);
  return response.data;
};
