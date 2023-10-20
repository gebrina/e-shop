import { AuthUser } from "../types/AuthUser";

export const getCurrentUser = (): AuthUser => {
  const user = localStorage.getItem("user") || "{}";
  if (user !== "undefined") {
    return JSON.parse(user);
  }

  return { access_token: "" };
};

export const storeLoggedInUser = (user: AuthUser) => {
  const stringifiedUser = JSON.stringify(user);
  localStorage.setItem("user", stringifiedUser);
};

export const removeLoggedInUser = () => localStorage.removeItem("user");
