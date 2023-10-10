import { Toast } from "primereact/toast";
import { FC, useEffect, useRef } from "react";
import { handleError, handleSuccess } from "../../utils";

export type NotificationType = undefined | "error" | "success";
type NotificationProps = {
  type: NotificationType;
  setType: (type: NotificationType) => void;
  title: string;
};

const Notification: FC<NotificationProps> = ({ type, title, setType }) => {
  const toastRef = useRef<Toast>(null);
  const toastedRef = useRef<number>(0);

  useEffect(() => {
    if (type) {
      toastedRef.current += 1;
      if (type === "success") {
        console.log(toastedRef.current);
        if (toastedRef.current === 1) {
          handleSuccess({
            toast: toastRef.current,
            summary: title || "Success",
            detail: "Operation succeded succssfully.",
          });
        }
      } else {
        if (toastedRef.current === 1) {
          handleError({
            toast: toastRef.current,
            summary: title || "Error",
            detail: "Operation faild, try again.",
          });
        }
      }
    }
    const timeout = setTimeout(() => setType(undefined), 3000);

    return () => clearTimeout(timeout);
  }, [type, title, setType]);

  return <Toast ref={toastRef} />;
};

export default Notification;
