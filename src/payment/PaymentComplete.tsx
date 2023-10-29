import { useCallback, useEffect, useRef } from "react";
import { useEcomContext } from "../context/EcomContext";
import "./Payment.scss";
import { FiArrowLeft, FiCheck } from "react-icons/fi";
import { NavLink } from "react-router-dom";
import axiosInstance from "../api/config";
import { jwtDecode } from "../utils";
import { IUser } from "../types/user";

export const PaymentComplete = () => {
  const { handleResetCart, productsInCart } = useEcomContext();

  const decodedToken: { user: IUser } | undefined = jwtDecode() as
    | { user: IUser }
    | undefined;

  const paymentIntentRef = useRef(0);

  const paymentInterArray = location.href
    ?.split("?")[1]
    ?.split("&")[0]
    ?.split("=");

  const handleCreatePayment = useCallback(
    async (amount: number) => {
      try {
        if (paymentIntentRef.current < 1) {
          await axiosInstance.post("/payment", {
            amount,
            user: decodedToken?.user,
          });
        }
        paymentIntentRef.current += 1;
        handleResetCart();
      } catch (e) {
        console.log(e);
      }
    },
    [decodedToken, handleResetCart]
  );

  useEffect(() => {
    if (productsInCart?.length) {
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
    }
  }, [productsInCart, handleCreatePayment, paymentInterArray, handleResetCart]);

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
