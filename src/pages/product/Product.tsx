import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";
import { FiX } from "react-icons/fi";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { IProduct } from "../../types/product";
import ProductCard from "./ProductCard";
import { GET_PRODUCT_CATEGORY_KEY, GET_PRODUCT_KEY } from "../../constants";
import { getAllProducts } from "../../api/product";
import "./Product.scss";
import { getAllProductCategories } from "../../api/product-category";
import Loader from "../../components/loader";
import ErrorPage from "../../components/error";

export const Product = () => {
  const { data: productCategories } = useQuery({
    queryKey: [GET_PRODUCT_CATEGORY_KEY],
    queryFn: getAllProductCategories,
  });

  const {
    data: products,
    isLoading,
    error,
  } = useQuery({
    queryKey: [GET_PRODUCT_KEY],
    queryFn: getAllProducts,
  });

  const [categorizedProducts, setCategorisedProducts] = useState<
    IProduct[] | undefined
  >();

  const [categoryId, setCategoryId] = useState<string>("");

  useEffect(() => {
    setCategorisedProducts(products);
  }, [products]);

  if (isLoading) return <Loader />;

  if (error) return <ErrorPage error={error as AxiosError} />;

  const handleCategoryChange = (value: string) => {
    setCategoryId(value);

    const filteredProducts = products?.filter(
      (product) => product.category?.id === value
    );
    setCategorisedProducts(filteredProducts);
  };

  const productCard = (product: IProduct, index: number) => (
    <motion.div
      initial={{ x: index % 2 == 0 ? -80 : 80, y: index % 2 == 0 ? -80 : 80 }}
      animate={{ x: 0, y: 0 }}
      transition={{ duration: 0.5 }}
      key={product.id}
      className="col-md-4  text-center  my-3"
    >
      <ProductCard product={product} />
    </motion.div>
  );

  const handleResetProducts = () => {
    setCategoryId("");
    setCategorisedProducts(products);
  };

  return (
    <section className="container pt-5">
      <div className="row ">
        <Dropdown
          className="col-md-4"
          value={categoryId}
          onChange={(e) => handleCategoryChange(e.value)}
          placeholder="Select Category"
          options={productCategories}
          optionLabel="name"
          optionValue="id"
        />
        {categoryId && (
          <Button
            onClick={handleResetProducts}
            className="col-md-1 btn left-items action-button fs-3"
          >
            <FiX />
          </Button>
        )}
      </div>
      <section className="products row">
        {categorizedProducts && categorizedProducts.length > 0 ? (
          categorizedProducts?.map((product, index) =>
            productCard(product, index)
          )
        ) : (
          <p className="fs-3 text-center my-5 text-info">
            There is no products.
          </p>
        )}
      </section>
    </section>
  );
};
