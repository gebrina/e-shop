import axios from "./config";

type AuthUser = {
  access_token: string;
};

export const loginUser = async (
  email: string,
  password: string
): Promise<AuthUser> => {
  const response = await axios.post("/auth/user", { email, password });
  return response.data;
};
