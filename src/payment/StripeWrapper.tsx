import { Elements } from "@stripe/react-stripe-js";
import { Stripe, StripeElementsOptions, loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import { FC, useEffect, useState } from "react";
import { PaymentForm } from "./PaymentForm";

type StripeWrapperProps = {
  amount: number;
};

export const StripeWrapper: FC<StripeWrapperProps> = ({ amount }) => {
  const [stripePromise, setStripePromise] =
    useState<Promise<Stripe | null>>(null);
  const [clientSecret, setClientSecret] = useState(null);

  const options: StripeElementsOptions = {};

  useEffect(() => {
    const getPublishableKey = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_APP_API_URL}/payment/public-key`
        );
        const stripe = loadStripe(response.data);
        setStripePromise(stripe);
      } catch (e) {
        console.log(e);
      }
    };
    getPublishableKey();
  }, []);

  useEffect(() => {
    const createPaymentIntent = async () => {
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_APP_API_URL}/payment/intent`,
          { amount }
        );
        setClientSecret(response.data);
      } catch (e) {
        console.log(e);
      }
    };
    createPaymentIntent();
  }, [amount]);

  return (
    <>
      {clientSecret && (
        <Elements
          options={{ ...options, clientSecret: clientSecret ?? undefined }}
          stripe={stripePromise}
        >
          <PaymentForm />
        </Elements>
      )}
    </>
  );
};
