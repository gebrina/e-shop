import { FC, createContext, useContext, useEffect, useState } from "react";
import { AuthUser } from "../types/AuthUser";
import {
  getCurrentUser,
  removeLoggedInUser,
  storeLoggedInUser,
} from "../utils/auth";
import { IProduct } from "../types/product";
import { saveCartProducts } from "../utils";

type CartProduct = {
  product: IProduct;
  quantity: number;
};

type EcomContextType = {
  isDashboard: boolean;
  currentUser: AuthUser | undefined;
  handleUserLogin: (user: AuthUser) => void;
  handleUserLogout: () => void;
  handleAddToCart?: (product: IProduct) => void;
  handleRemoveFromCart?: (id: string) => void;
  productsInCart?: CartProduct[];
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

  const handleAddToCart = (product: IProduct) => {
    const productsInCartIndex = values.productsInCart?.findIndex(
      (cart) => cart.product.id == product.id
    );

    const productsInCart = values.productsInCart;
    if (typeof productsInCartIndex === "number" && productsInCartIndex !== -1) {
      productsInCart?.splice(productsInCartIndex, 1, {
        product,
        quantity: productsInCart[productsInCartIndex].quantity + 1,
      });
    } else {
      productsInCart?.push({ product, quantity: 1 });
    }

    setValues({ ...values, productsInCart });
    saveCartProducts(productsInCart ?? []);
  };

  const handleRemoveFromCart = (id: string) => {
    const productsInCart = values.productsInCart?.filter(
      (product) => product.product.id !== id
    );
    setValues({ ...values, productsInCart });
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
