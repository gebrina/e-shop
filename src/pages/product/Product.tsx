import { useQuery } from "@tanstack/react-query";
import "./Product.scss";
import { GET_PRODUCT_CATEGORY_KEY, GET_PRODUCT_KEY } from "../../constants";
import { getAllProducts } from "../../api/product";
import { getAllProductCategories } from "../../api/product-category";
import Loader from "../../components/loader";
import ErrorPage from "../../components/error";
import { AxiosError } from "axios";
import { Dropdown } from "primereact/dropdown";
import { useEffect, useState } from "react";
import { IProduct } from "../../types/product";
import ProductCard from "./ProductCard";
import { Button } from "primereact/button";
import { FiX } from "react-icons/fi";

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

  const productCard = (product: IProduct) => (
    <div key={product.id} className="col-md-4 text-center  my-3">
      <ProductCard product={product} />
    </div>
  );

  const handleResetProducts = () => {
    setCategoryId("");
    setCategorisedProducts(products);
  };

  return (
    <section className="container">
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
        {categorizedProducts?.map((product) => productCard(product))}
      </section>
    </section>
  );
};
