import { Toast } from "primereact/toast";
import { FC, useEffect, useRef } from "react";
import { handleError, handleSuccess } from "../../utils";

export type NotificationType = undefined | "error" | "success";
type NotificationProps = {
  type: NotificationType;
  setType: (type: NotificationType) => void;
  title: string;
  succesMsg?: string;
  errorMsg?: string;
  position?:
    | "center"
    | "top-center"
    | "top-left"
    | "top-right"
    | "bottom-center"
    | "bottom-left"
    | "bottom-right"
    | undefined;
};

const Notification: FC<NotificationProps> = ({
  type,
  title,
  setType,
  succesMsg,
  errorMsg,
  position,
}) => {
  const toastRef = useRef<Toast>(null);
  const toastedRef = useRef<number>(0);

  useEffect(() => {
    if (type) {
      toastedRef.current += 1;
      if (type === "success") {
        if (toastedRef.current === 1) {
          handleSuccess({
            toast: toastRef.current,
            summary: title || "Success",
            detail: succesMsg || "Operation succeded succssfully.",
          });
        }
      } else {
        if (toastedRef.current === 1) {
          handleError({
            toast: toastRef.current,
            summary: title || "Error",
            detail: errorMsg || "Operation faild, try again.",
          });
        }
      }
    }
    const timeout = setTimeout(() => setType(undefined), 3000);

    return () => clearTimeout(timeout);
  }, [type, title, setType, succesMsg, errorMsg]);

  return <Toast ref={toastRef} position={position} />;
};

export default Notification;
