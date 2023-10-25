import { useEffect } from "react";
import { useEcomContext } from "../context/EcomContext";
import paymentcomplete from "../assets/pcomplete.png";
import "./Payment.scss";

export const PaymentComplete = () => {
  const { handleResetCart } = useEcomContext();
  useEffect(() => {
    handleResetCart();
  }, [handleResetCart]);

  return <section>Complete</section>;
};
