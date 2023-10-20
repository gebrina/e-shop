import { Sidebar } from "primereact/sidebar";
import { FC } from "react";
import { FiArrowLeft, FiCheck, FiPlus, FiXCircle } from "react-icons/fi";
import { Button } from "primereact/button";
import { NavLink } from "react-router-dom";
import { useEcomContext } from "../../context/EcomContext";
import { CartCard } from "./Card";
import cart from "../../assets/empty-cart.png";
import "./Sidebar.scss";

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
      <Sidebar
        className="col-md-4 col-sm-12"
        visible={open}
        header={cartHeader}
        position="right"
        closeIcon={<FiXCircle className="fs-3 bg-light shadow  text-danger" />}
        onHide={() => setOpen(false)}
      >
        {productsInCart?.map((cart) => (
          <CartCard key={cart.product.id} cart={cart} />
        ))}
        {productsInCart?.length === 0 && (
          <div className="bg-light px-2 d-flex flex-column jusitify-content-center align-items-center py-3">
            <img src={cart} className="rounded" alt="empty cart" />
            <h3 className="text-info my-3">Your cart is currently empty!</h3>

            <p>
              Before proceed to checkout, you must add some products to your
              cart.
              <br />
              You will find a lot of interesting products on our "Products"
              page.
            </p>
            <p></p>
          </div>
        )}
        <div className="d-flex justify-content-between">
          <NavLink to={"/products"} className={"mt-3 d-block"}>
            <Button
              onClick={() => setOpen(false)}
              className="btn center-items btn-outline-success"
            >
              <FiArrowLeft /> <span>Return to product</span>
            </Button>
          </NavLink>

          {productsInCart && productsInCart.length > 0 && (
            <NavLink to={"/cart/checkout"} className={"mt-3 d-block"}>
              <Button
                onClick={() => setOpen(false)}
                className="btn center-items btn-outline-primary"
              >
                <FiCheck /> <span>Checkout</span>
              </Button>
            </NavLink>
          )}
        </div>
      </Sidebar>
    </>
  );
};
