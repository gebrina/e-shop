import { FC, createContext, useContext, useEffect, useState } from "react";
import { AuthUser } from "../types/AuthUser";
import { getCurrentUser } from "../utils/auth";

type EcomContextType = {
  isDashboard: boolean;
  currentUser?: AuthUser;
  handleUserLogin?: (user: AuthUser) => void;
  handleLogout?: () => void;
};

const EcomContext = createContext<EcomContextType>({
  isDashboard: false,
});

export const EcomContextProvider: FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [values, setValues] = useState<EcomContextType>({ isDashboard: false });

  useEffect(() => {
    const pathname = location.pathname;
    if (pathname.includes("board")) {
      const currentUser = getCurrentUser();
      setValues({ ...values, currentUser, isDashboard: true });
    }
  }, [values]);
  return <EcomContext.Provider value={values}>{children}</EcomContext.Provider>;
};

export const useEcomContext = () => useContext(EcomContext);
