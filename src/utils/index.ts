import jwt_decode from "jwt-decode";

import { Toast } from "primereact/toast";
import { getCurrentUser } from "./auth";

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

  let timeout = null;
  if (timeout) clearTimeout(timeout);

  timeout = setTimeout(() => {
    handleNavigation && handleNavigation();
  }, sec);
};

export const handleError = (msg: ToastMsg) => {
  const { toast, summary, detail } = msg;
  toast?.show({
    severity: "error",
    summary,
    detail,
  });
};

export const jwtDecode = (): any => jwt_decode(getCurrentUser().access_token);
