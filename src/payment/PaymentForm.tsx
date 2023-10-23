import {
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { Button } from "primereact/button";
import { FC, FormEvent, useEffect, useState } from "react";

export const PaymentForm: FC = () => {
  const stripe = useStripe();
  const elements = useElements();

  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!stripe) {
      return;
    }

    const clientSecret = new URLSearchParams(window.location.search).get(
      "payment_intent_client_secret"
    );

    if (!clientSecret) {
      return;
    }

    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      switch (paymentIntent?.status) {
        case "succeeded":
          setMessage("Payment succeeded!");
          break;
        case "processing":
          setMessage("Your payment is processing.");
          break;
        case "requires_payment_method":
          setMessage("Your payment was not successful, please try again.");
          break;
        default:
          setMessage("Something went wrong.");
          break;
      }
    });
  }, [stripe]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!stripe || !elements) return;
    setSubmitting(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: location.origin,
      },
    });

    if (error.type === "card_error" || error.type === "validation_error") {
      setMessage(error?.message);
    } else {
      setMessage("Un expected error occured");
    }
    setSubmitting(false);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="col-md-4 card px-3 py-5 shadow mx-auto my-5"
    >
      <PaymentElement />
      {message && <p className="text-danger text-center">{message}</p>}
      <Button className="btn w-100 my-3 py-2 btn-outline-success">
        {submitting ? "Submitting ..." : "Submit"}
      </Button>
    </form>
  );
};
