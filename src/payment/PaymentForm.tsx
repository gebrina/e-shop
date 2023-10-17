import {
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { Button } from "primereact/button";
import { FC, FormEvent, useState } from "react";

type PaymentFormProps = {
  client_secret: string | null;
};

export const PaymentForm: FC<PaymentFormProps> = ({ client_secret }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [submitting, setSubmitting] = useState(false);

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
