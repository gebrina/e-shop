import { useQuery } from "@tanstack/react-query";

import { useParams } from "react-router-dom";
import { AxiosError } from "axios";
import { GET_SINGLE_PRODUCT_KEY } from "../../../constants";
import { getSingleProduct } from "../../../api/product";
import Loader from "../../../components/loader";
import ErrorPage from "../../../components/error";
import "./ProductDetais.scss";
import { Card } from "primereact/card";

export const ProductDetails = () => {
  const { id } = useParams();

  const {
    data: product,
    isLoading,
    error,
  } = useQuery({
    queryKey: [GET_SINGLE_PRODUCT_KEY],
    queryFn: () => getSingleProduct(id ?? ""),
    enabled: !!id,
  });

  if (isLoading) return <Loader />;

  if (error) return <ErrorPage error={error as AxiosError} />;

  const cardFooter = () => (
    <div>
      <p>Price: ${product?.price}</p>
      <p>Quantity: {product?.quantity}</p>
    </div>
  );

  return (
    <section className="container my-5 py-4">
      <div className="row">
        <Card
          className="col-md-6 text-center pro-card"
          title={product?.name}
          subTitle={product?.category?.name}
        >
          <img
            className="pro-img"
            src={import.meta.env.VITE_APP_API_URL + product?.image}
            alt={product?.name}
          />
        </Card>

        <div className="col-md-6">
          <div
            dangerouslySetInnerHTML={{ __html: product?.description ?? "" }}
          />
        </div>
      </div>
    </section>
  );
};
