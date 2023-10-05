import { Toast } from "primereact/toast";
import { FC, useEffect, useRef } from "react";
import { handleError, handleSuccess } from "../../utils";

export type NotificationType = "error" | "success" | undefined;
type NotificationProps = {
  type: NotificationType;
  title: string;
};

const Notification: FC<NotificationProps> = ({ type, title }) => {
  const toastRef = useRef<Toast>(null);

  useEffect(() => {
    if (type == "error") {
      handleError({
        toast: toastRef.current,
        summary: title ?? "Error",
        detail: "Operation faild, try again.",
      });
    } else {
      handleSuccess({
        toast: toastRef.current,
        summary: title || "Success",
        detail: "Operation succeded successfully.",
      });
    }
  }, [type, title]);

  return <Toast ref={toastRef} />;
};

export default Notification;
