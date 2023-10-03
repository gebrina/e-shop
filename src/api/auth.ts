import axios from "./config";

type AuthUser = {
  access_token: string;
};

type LoginUserInfo = {
  email: string;
  password: string;
};

export const loginUser = async (userInfo: LoginUserInfo): Promise<AuthUser> => {
  const response = await axios.post("/auth/user", userInfo);
  return response.data;
};
