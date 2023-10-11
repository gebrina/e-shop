import { FC } from "react";
import { IProduct } from "../../types/product";
import { Card } from "primereact/card";

type ProductCardProps = {
  product: IProduct;
};

const ProductCard: FC<ProductCardProps> = ({ product }) => {
  return <Card title={product.name}></Card>;
};

export default ProductCard;
