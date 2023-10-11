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
import { IProductCategory } from "../../types/product-category";
import { Card } from "primereact/card";

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
    <div className="col-md-4 text-center  my-3">
      <Card title={product.name} />
    </div>
  );

  return (
    <section className="container">
      <Dropdown
        value={categoryId}
        onChange={(e) => handleCategoryChange(e.value)}
        placeholder="Select Category"
        options={productCategories}
        optionLabel="name"
        optionValue="id"
      />

      <section className="products row">
        {categorizedProducts?.map((product) => productCard(product))}
      </section>
    </section>
  );
};
