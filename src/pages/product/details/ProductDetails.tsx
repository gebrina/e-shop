import { useQuery } from "@tanstack/react-query";
import DOMPurirify from "dompurify";
import { useParams } from "react-router-dom";
import { AxiosError } from "axios";
import { GET_SINGLE_PRODUCT_KEY } from "../../../constants";
import { getSingleProduct } from "../../../api/product";
import Loader from "../../../components/loader";
import ErrorPage from "../../../components/error";
import "./ProductDetais.scss";
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import { FiPlus } from "react-icons/fi";

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
    <div className="d-flex  justify-content-between align-items-center ">
      <p className="bg-light border my-1 py-1 px-3">Price: ${product?.price}</p>
      <p className="bg-light border my-1 py-1 px-3">
        Quantity: {product?.quantity}
      </p>

      <Button className="btn center-items text-success btn-light border">
        <FiPlus /> <span>Add</span>
      </Button>
    </div>
  );

  return (
    <section className="container my-5 py-4">
      <div className="row">
        <Card
          className="col-md-6 text-center pro-card"
          title={product?.name}
          subTitle={product?.category?.name}
          footer={cardFooter}
        >
          <img
            className="pro-img"
            src={import.meta.env.VITE_APP_API_URL + product?.image}
            alt={product?.name}
          />
        </Card>

        <div className="col-md-6">
          <div
            dangerouslySetInnerHTML={{
              __html: DOMPurirify.sanitize(product?.description ?? ""),
            }}
          />
        </div>
      </div>
    </section>
  );
};
