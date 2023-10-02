import { FC, createContext, useContext, useEffect, useState } from "react";
import { AuthUser } from "../types/AuthUser";
import {
  getCurrentUser,
  removeLoggedInUser,
  storeLoggedInUser,
} from "../utils/auth";

type EcomContextType = {
  isDashboard?: boolean;
  currentUser?: AuthUser;
  handleUserLogin?: (user: AuthUser) => void;
  handleUserLogout?: () => void;
};

const EcomContext = createContext<EcomContextType>({});

export const EcomContextProvider: FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [values, setValues] = useState<EcomContextType>({});

  useEffect(() => {
    const handleUserLogin = (user: AuthUser) => {
      storeLoggedInUser(user);
      setValues({ ...values, currentUser: user });
    };

    const handleUserLogout = () => {
      setValues({ isDashboard: false, currentUser: undefined });
      removeLoggedInUser();
    };

    const pathname = location.pathname;
    if (pathname.includes("dashboard")) {
      const currentUser = getCurrentUser();
      setValues({
        handleUserLogin,
        handleUserLogout,
        currentUser,
        isDashboard: true,
      });
    }
  }, []);

  return <EcomContext.Provider value={values}>{children}</EcomContext.Provider>;
};

export const useEcomContext = () => useContext(EcomContext);
