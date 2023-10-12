import { useQuery } from "@tanstack/react-query";

import { useParams } from "react-router-dom";

import "./ProductDetais.scss";
import { GET_SINGLE_PRODUCT_KEY } from "../../../constants";
import { getSingleProduct } from "../../../api/product";
import Loader from "../../../components/loader";
import ErrorPage from "../../../components/error";
import { AxiosError } from "axios";

export const ProductDetails = () => {
  const { id } = useParams();

  const { data, isLoading, error } = useQuery({
    queryKey: [GET_SINGLE_PRODUCT_KEY],
    queryFn: () => getSingleProduct(id),
    enabled: !!id,
  });

  if (isLoading) return <Loader />;

  if (error) return <ErrorPage error={error as AxiosError} />;

  return <section></section>;
};
