import { FC } from "react";

type ErrorPageProps = {
  error: string;
};
const ErrorPage: FC<ErrorPageProps> = ({ error }) => {
  return (
    <section className="mx-auto center-items py-5 my-5 fs-1 text-danger fw-bold">
      <p className="w-max border px-5 border-danger shadow  rounded">
        {" "}
        {error}
      </p>
    </section>
  );
};

export default ErrorPage;
