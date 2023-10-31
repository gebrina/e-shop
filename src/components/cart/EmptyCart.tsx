import { useEcomContext } from "../../context/EcomContext";
import cart from "../../assets/empty-cart.png";
import { FiCheck, FiPlus } from "react-icons/fi";
import { NavLink } from "react-router-dom";
import { Button } from "primereact/button";
import { FC } from "react";

type EmptyCartProps = {
  setOpen?: (open: boolean) => void;
};
export const EmptyCart: FC<EmptyCartProps> = ({ setOpen }) => {
  const { productsInCart } = useEcomContext();

  return (
    <>
      {productsInCart?.length === 0 && (
        <div
          className={` px-2 d-flex flex-column jusitify-content-center align-items-center py-3`}
        >
          <img src={cart} className="rounded" alt="empty cart" />
          <h3 className="text-info my-3">Your cart is currently empty!</h3>

          <p>
            Before proceed to checkout, you must add some products to your cart.
            <br />
            You will find a lot of interesting products on our "Products" page.
          </p>
          <p></p>
        </div>
      )}

      <div className="d-flex justify-content-between">
        <NavLink to={"/products"} className={"mt-3 d-block"}>
          <Button
            onClick={() => setOpen && setOpen(false)}
            className="btn center-items btn-outline-success"
          >
            <FiPlus /> <span> More Products</span>
          </Button>
        </NavLink>

        {productsInCart && productsInCart?.length > 0 && (
          <NavLink to={"/cart/checkout"} className={"mt-3 d-block"}>
            <Button
              onClick={() => setOpen && setOpen(false)}
              className="btn center-items btn-outline-primary"
            >
              <FiCheck /> <span>Checkout</span>
            </Button>
          </NavLink>
        )}
      </div>
    </>
  );
};
