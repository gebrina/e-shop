import { IUser } from "../types/user";
import axios from "./config";

export const findAllUsers = async (): Promise<IUser[]> => {
  return await axios.get("/users");
};

export const findOneUser = async (id: string): Promise<IUser> => {
  return await axios.get(`/users/${id}`);
};

export const createUser = async (user: IUser): Promise<IUser> => {
  return await axios.post("/users", user);
};
