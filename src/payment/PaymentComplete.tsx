import { useEffect, useRef } from "react";
import { useEcomContext } from "../context/EcomContext";
import "./Payment.scss";
import { FiArrowLeft, FiCheck } from "react-icons/fi";
import { NavLink } from "react-router-dom";
import axiosInstance from "../api/config";
import { jwtDecode } from "../utils";

export const PaymentComplete = () => {
  const { handleResetCart } = useEcomContext();
  const decodedToken = jwtDecode();

  const paymentIntentRef = useRef(0);

  const paymentInterArray = location.href
    .split("?")[1]
    .split("&")[0]
    .split("=");

  const handleCreatePayment = async (amount: number) => {
    try {
      if (paymentIntentRef.current < 1) {
        const res = await axiosInstance.post("/payment", {
          amount,
          user: decodedToken?.user,
        });
      }
      paymentIntentRef.current += 1;
    } catch (e) {}
  };

  useEffect(() => {
    handleResetCart();
    const retrievePaymentIntent = async () => {
      try {
        const response = await axiosInstance.get(
          `/payment/retrieve/${paymentInterArray[1]}`
        );
        const { amount } = response.data;
        handleCreatePayment(amount);
      } catch (e) {
        console.log(e);
      }
    };
    retrievePaymentIntent();
  }, []);

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
