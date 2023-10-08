import { FC, createContext, useContext, useEffect, useState } from "react";
import { AuthUser } from "../types/AuthUser";
import {
  getCurrentUser,
  removeLoggedInUser,
  storeLoggedInUser,
} from "../utils/auth";

type EcomContextType = {
  isDashboard: boolean;
  currentUser: AuthUser | undefined;
  handleUserLogin: (user: AuthUser) => void;
  handleUserLogout: () => void;
};

const defaultValues: EcomContextType = {
  isDashboard: false,
  currentUser: { access_token: "" },
  handleUserLogin: () => {},
  handleUserLogout: () => {},
};

const EcomContext = createContext<EcomContextType>(defaultValues);

export const EcomContextProvider: FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [values, setValues] = useState<EcomContextType>(defaultValues);

  const handleUserLogin = (user: AuthUser) => {
    console.log("handle user login");
    storeLoggedInUser(user);
    setValues({ ...values, currentUser: user });
  };

  const handleUserLogout = () => {
    setValues({ ...values, isDashboard: true, currentUser: undefined });
    removeLoggedInUser();
  };

  useEffect(() => {
    const pathname = location.pathname;
    if (pathname.includes("dashboard")) {
      const currentUser = getCurrentUser();
      setValues((prev) => ({ ...prev, currentUser, isDashboard: true }));
    }
  }, []);

  return (
    <EcomContext.Provider
      value={{ ...values, handleUserLogin, handleUserLogout }}
    >
      {children}
    </EcomContext.Provider>
  );
};

export const useEcomContext = () => useContext(EcomContext);
