import { Sidebar } from "primereact/sidebar";
import { FC } from "react";
import { FiCheck, FiPlus, FiXCircle } from "react-icons/fi";
import { useEcomContext } from "../../context/EcomContext";
import { CartCard } from "./Card";
import "./Sidebar.scss";
import { Button } from "primereact/button";
import { NavLink } from "react-router-dom";
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
          className="col-md-4 col-sm-12"
          visible={open}
          header={cartHeader}
          position="right"
          closeIcon={
            <FiXCircle className="fs-3 bg-light shadow  text-danger" />
          }
          onHide={() => setOpen(false)}
        >
          {productsInCart?.map((cart) => (
            <CartCard cart={cart} />
          ))}

          <div className="d-flex justify-content-between">
            <NavLink to={"/products"} className={"mt-3 d-block"}>
              <Button
                onClick={() => setOpen(false)}
                className="btn center-items btn-outline-success"
              >
                <FiPlus /> <span>Add product</span>
              </Button>
            </NavLink>

            <NavLink to={"/cart/checkout"} className={"mt-3 d-block"}>
              <Button
                onClick={() => setOpen(false)}
                className="btn center-items btn-outline-primary"
              >
                <FiCheck /> <span>Checkout</span>
              </Button>
            </NavLink>
          </div>
        </Sidebar>
      }
    </>
  );
};
