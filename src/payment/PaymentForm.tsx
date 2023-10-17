import {
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { Button } from "primereact/button";
import { FormEvent } from "react";

export const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [submitting, setSubmitting] = useStripe(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setSubmitting(true);
  };

  return (
    <form onSubmit={handleSubmit}>
      <PaymentElement />
      <Button className="btn btn-outline-success">Submit</Button>
    </form>
  );
};
