import { useQuery } from "@tanstack/react-query";
import DOMPurify from "dompurify";
import { NavLink, useParams } from "react-router-dom";
import { AxiosError } from "axios";
import { GET_SINGLE_PRODUCT_KEY } from "../../../constants";
import { getSingleProduct } from "../../../api/product";
import Loader from "../../../components/loader";
import ErrorPage from "../../../components/error";
import "./ProductDetais.scss";
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import { FiArrowRight, FiPlus } from "react-icons/fi";
import { useEcomContext } from "../../../context/EcomContext";

export const ProductDetails = () => {
  const { id } = useParams();
  const { handleAddToCart } = useEcomContext();

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

  const handleAddProduct = () => {
    handleAddToCart && product && handleAddToCart(product);
  };

  const cardFooter = () => (
    <div className="d-flex  justify-content-between align-items-center ">
      <p className="bg-light border my-1 py-1 px-3">Price: ${product?.price}</p>
      <p className="bg-light border my-1 py-1 px-3">
        Quantity: {product?.quantity}
      </p>

      <Button
        onClick={handleAddProduct}
        className="btn center-items text-success btn-light border"
      >
        <FiPlus /> <span>Add</span>
      </Button>
    </div>
  );

  return (
    <section className="container-fluid   my-5 py-4">
      <div
        className="bg-img"
        style={{
          backgroundImage: `url(${
            import.meta.env.VITE_APP_API_URL + product?.image
          })`,
        }}
      ></div>
      <div className="container">
        <div className="row">
          <Card
            style={{ backgroundColor: "transparent" }}
            className="col-md-6 text-center pro-card shadow-none"
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

          <div className="col-md-6 ">
            <h1 className="text-center mb-5 mt-2 text-success">
              {product?.name}
            </h1>

            <div
              className="lh-lg"
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(product?.description ?? ""),
              }}
            />

            <NavLink to="/products">
              <Button className="btn center-items btn-outline-success">
                More Products &nbsp;
                <FiArrowRight />
              </Button>
            </NavLink>
          </div>
        </div>
      </div>
    </section>
  );
};
