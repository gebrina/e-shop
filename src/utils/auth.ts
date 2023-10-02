import { Toast } from "primereact/toast";

type ToastMsg = {
  toast: Toast | null;
  summary: string;
  detail: string;
};

export const handleSuccess = (msg: ToastMsg) => {
  const { toast, summary, detail } = msg;
  toast?.show({
    severity: "success",
    summary,
    detail,
  });
};

export const handleError = (msg: ToastMsg) => {
  const { toast, summary, detail } = msg;
  toast?.show({
    severity: "error",
    summary,
    detail,
  });
};
