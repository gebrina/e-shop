import { ReactNode } from "react";
import { FiLoader, FiPackage, FiSend } from "react-icons/fi";

export type OrderStatusOptions = {
  label: ReactNode;
  value: number;
};

export type OrderStatus = {
  id: string;
  status: number;
};

export const statusOptions: OrderStatusOptions[] = [
  {
    label: (
      <span>
        <FiLoader className="text-info" /> &nbsp; Pending
      </span>
    ),
    value: 0,
  },
  {
    label: (
      <span>
        <FiSend className="text-primary" /> &nbsp; Sent
      </span>
    ),
    value: 1,
  },
  {
    label: (
      <span>
        <FiPackage className="text-success" /> &nbsp; Received
      </span>
    ),
    value: 2,
  },
];
