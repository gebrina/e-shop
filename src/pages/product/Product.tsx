import { useQuery } from "@tanstack/react-query";
import "./Product.scss";
import { GET_PRODUCT_KEY } from "../../constants";
import { getAllProducts } from "../../api/product";

export const Product = () => {
  const {} = useQuery({
    queryKey: [GET_PRODUCT_KEY],
    queryFn: getAllProducts,
  });
  return <section className="pros-container">Product</section>;
};
