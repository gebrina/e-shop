import { FC, createContext, useContext, useEffect, useState } from "react";
import { AuthUser } from "../types/AuthUser";
import {
  getCurrentUser,
  removeLoggedInUser,
  storeLoggedInUser,
} from "../utils/auth";
import { IProduct } from "../types/product";
import { getProductsAddedtoCart, saveCartProducts } from "../utils";

export type CartProduct = {
  product: IProduct;
  quantity: number;
};

type EcomContextType = {
  isDashboard: boolean;
  currentUser: AuthUser | undefined;
  handleUserLogin: (user: AuthUser) => void;
  handleUserLogout: () => void;
  handleAddToCart?: (product: IProduct, quantity?: number) => void;
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
    setValues({ ...values, isDashboard: false, currentUser: undefined });
    removeLoggedInUser();
  };

  const handleAddToCart = (product: IProduct, quantity?: number) => {
    const productsInCartIndex = values.productsInCart?.findIndex(
      (cart) => cart.product.id == product.id
    );

    const productsInCart = values.productsInCart;
    if (typeof productsInCartIndex === "number" && productsInCartIndex !== -1) {
      if (typeof quantity === "number") {
        console.log(quantity);
        productsInCart?.splice(productsInCartIndex, 1, { product, quantity });
      } else {
        productsInCart?.splice(productsInCartIndex, 1, {
          product,
          quantity: productsInCart[productsInCartIndex].quantity + 1,
        });
      }
    } else {
      productsInCart?.push({ product, quantity: 1 });
    }

    setValues({ ...values, productsInCart });
    saveCartProducts(productsInCart ?? []);
  };

  const handleRemoveFromCart = (id: string) => {
    const productsInCart = values.productsInCart?.filter(
      (cart) => cart.product.id !== id
    );
    setValues({ ...values, productsInCart });
    saveCartProducts(productsInCart ?? []);
  };

  useEffect(() => {
    const pathname = location.pathname;
    const currentUser = getCurrentUser();
    if (pathname.includes("dashboard")) {
      setValues((prev) => ({
        ...prev,
        currentUser,
        isDashboard: true,
      }));
    } else {
      const productsInCart = getProductsAddedtoCart();
      setValues((prev) => ({
        ...prev,
        currentUser,
        productsInCart,
        isDashboard: false,
      }));
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
