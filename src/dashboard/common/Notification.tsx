import { Toast } from "primereact/toast";
import { FC, useEffect, useRef } from "react";
import { handleError, handleSuccess } from "../../utils";

export type NotificationType = undefined | "error" | "success";
type NotificationProps = {
  type: NotificationType;
  title: string;
};

const Notification: FC<NotificationProps> = ({ type, title }) => {
  const toastRef = useRef<Toast>(null);
  const toastedRef = useRef<number>(0);
  useEffect(() => {
    if (type) {
      if (type === "success") {
        toastedRef.current += 1;
        if (toastedRef.current === 1) {
          handleSuccess({
            toast: toastRef.current,
            summary: title || "Success",
            detail: "Operation succeded succssfully.",
          });
        }
      } else {
        toastedRef.current += 1;
        if (toastedRef.current === 1) {
          handleError({
            toast: toastRef.current,
            summary: title || "Error",
            detail: "Operation faild, try again.",
          });
        }
      }
    }
  }, [type, title]);

  return <Toast ref={toastRef} />;
};

export default Notification;
