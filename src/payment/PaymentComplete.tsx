import { useEffect } from "react";
import { useEcomContext } from "../context/EcomContext";
import "./Payment.scss";
import { FiArrowLeft, FiCheck } from "react-icons/fi";
import { NavLink } from "react-router-dom";

export const PaymentComplete = () => {
  const { handleResetCart } = useEcomContext();
  useEffect(() => {
    handleResetCart();
  }, [handleResetCart]);

  return (
    <section className="container center-items my-5">
      <div className="payment-complete  bg-light">
        <p className="fw-bold text-success success-icon">
          <FiCheck />
        </p>
        <h1 className="text-success">Payment Successfull</h1>
        <p>Thank you! Your payment is complete</p>
        <NavLink
          className={"btn btn-outline-success center-items fs-5 mb-3 mx-auto"}
          to={"/products"}
        >
          <FiArrowLeft /> &nbsp;Products
        </NavLink>
      </div>
    </section>
  );
};
