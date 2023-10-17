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
  const [error, setError] = useState("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!stripe || !elements) return;
    setSubmitting(true);
    const result = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: "/",
      },
    });
    setSubmitting(false);
    if (result.error) {
      setError(error);
    } else {
      console.log("payement confirmed");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="col-md-4 mx-auto my-5">
      <PaymentElement />
      <Button className="btn w-100 my-3 py-2 btn-outline-success">
        {submitting ? "Submitting ..." : "Submit"}
      </Button>
    </form>
  );
};
