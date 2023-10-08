import { AxiosError } from "axios";
import { FC } from "react";

type ErrorPageProps = {
  error: AxiosError;
};
const ErrorPage: FC<ErrorPageProps> = ({ error }) => {
  return (
    <section className="mx-auto center-items py-5 my-5 fs-1 text-danger fw-bold">
      <p className="w-max border px-5 border-danger shadow  rounded">
        {error.message}
      </p>
    </section>
  );
};

export default ErrorPage;
