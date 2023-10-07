import { FC } from "react";

type ErrorPageProps = {
  error: string;
};
const ErrorPage: FC<ErrorPageProps> = ({ error }) => {
  return <section>{error}</section>;
};

export default ErrorPage;
