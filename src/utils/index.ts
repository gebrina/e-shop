import jwt_decode from "jwt-decode";
import { format } from "date-fns";
import { Toast } from "primereact/toast";
import { getCurrentUser } from "./auth";
import { IProduct } from "../types/product";
import { CartProduct } from "../context/EcomContext";

type ToastMsg = {
  toast: Toast | null;
  summary: string;
  detail: string;
  sec?: number;
  handleNavigation?: () => void;
};

export const handleSuccess = (msg: ToastMsg) => {
  const { toast, summary, detail, handleNavigation, sec = 3000 } = msg;

  toast?.show({
    severity: "success",
    summary,
    detail,
  });

  if (typeof handleNavigation === "function") {
    let timeout = null;
    if (timeout) clearTimeout(timeout);

    timeout = setTimeout(() => {
      handleNavigation();
    }, sec);
  }
};

export const handleError = (msg: ToastMsg) => {
  const { toast, summary, detail } = msg;
  toast?.show({
    severity: "error",
    summary,
    detail,
  });
};

export const jwtDecode = () => {
  try {
    const token = jwt_decode(getCurrentUser().access_token);
    return token;
  } catch (err) {
    return {};
  }
};

export const getFormatedDate = (strigifiedDate: string): string => {
  const date = new Date(strigifiedDate);
  return format(date, "yyyy-MMM-dd hh:mm:ss");
};

export const saveCartProducts = (product: IProduct[]) => {
  const strigifiedProducts = JSON.stringify(product);
  localStorage.setItem("cart", strigifiedProducts);
};

export const getProductsAddedtoCart = (): CartProduct[] => {
  const products = localStorage.getItem("cart") ?? "{}";
  return JSON.parse(products);
};
