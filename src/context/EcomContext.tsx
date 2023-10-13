import { FC, createContext, useContext, useEffect, useState } from "react";
import { AuthUser } from "../types/AuthUser";
import {
  getCurrentUser,
  removeLoggedInUser,
  storeLoggedInUser,
} from "../utils/auth";
import { IProduct } from "../types/product";

type EcomContextType = {
  isDashboard: boolean;
  currentUser: AuthUser | undefined;
  handleUserLogin: (user: AuthUser) => void;
  handleUserLogout: () => void;
  handleAddToCart?: (product: IProduct) => void;
  handleRemoveFromCart?: (id: string) => void;
  productsInCart?: IProduct[];
};

const defaultValues: EcomContextType = {
  isDashboard: false,
  currentUser: { access_token: "" },
  handleUserLogin: () => {},
  handleUserLogout: () => {},
  handleAddToCart: () => {},
  handleRemoveFromCart: () => {},
  productsInCart: [],
};

const EcomContext = createContext<EcomContextType>(defaultValues);

export const EcomContextProvider: FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [values, setValues] = useState<EcomContextType>(defaultValues);

  const handleUserLogin = (user: AuthUser) => {
    storeLoggedInUser(user);
    setValues({ ...values, currentUser: user });
  };

  const handleUserLogout = () => {
    setValues({ ...values, isDashboard: true, currentUser: undefined });
    removeLoggedInUser();
  };

  const handleAddToCart = (product: IProduct) => {};

  const handleRemoveFromCart = (id: string) => {};

  useEffect(() => {
    const pathname = location.pathname;
    if (pathname.includes("dashboard")) {
      const currentUser = getCurrentUser();
      setValues((prev) => ({ ...prev, currentUser, isDashboard: true }));
    }
  }, []);

  return (
    <EcomContext.Provider
      value={{
        ...values,
        handleAddToCart,
        handleRemoveFromCart,
        handleUserLogin,
        handleUserLogout,
      }}
    >
      {children}
    </EcomContext.Provider>
  );
};

export const useEcomContext = () => useContext(EcomContext);
