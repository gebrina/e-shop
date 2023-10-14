import { Sidebar } from "primereact/sidebar";
import { FC } from "react";

type CartSidebarProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
};

export const CartSidebar: FC<CartSidebarProps> = ({ open, setOpen }) => {
  return (
    <>{<Sidebar visible={open} onHide={() => setOpen(false)}></Sidebar>}</>
  );
};
