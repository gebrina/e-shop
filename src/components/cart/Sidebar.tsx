import { Sidebar } from "primereact/sidebar";
import { FC } from "react";
import { FiXCircle } from "react-icons/fi";
import { useEcomContext } from "../../context/EcomContext";
import { Card } from "./Card";

type CartSidebarProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
};

export const CartSidebar: FC<CartSidebarProps> = ({ open, setOpen }) => {
  const { productsInCart } = useEcomContext();

  const cartHeader = () => (
    <h1 className="text-left bg-light  py-2 w-100 text-info">Your Cart</h1>
  );

  return (
    <>
      {
        <Sidebar
          className="col-md-4"
          visible={open}
          header={cartHeader}
          position="right"
          closeIcon={
            <FiXCircle className="fs-3 bg-light shadow  text-danger" />
          }
          onHide={() => setOpen(false)}
        >
          {productsInCart?.map((cart) => (
            <Card cart={cart} />
          ))}
        </Sidebar>
      }
    </>
  );
};
