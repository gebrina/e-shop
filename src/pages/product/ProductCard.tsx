import { FC } from "react";
import { IProduct } from "../../types/product";
import { Card } from "primereact/card";
import { Button } from "primereact/button";

type ProductCardProps = {
  product: IProduct;
};

const ProductCard: FC<ProductCardProps> = ({ product }) => {
  const { name, price, quantity, id, category, image } = product;

  const header = () => (
    <img src={import.meta.env.VITE_APP_API_URL + image} alt={name} />
  );

  const footer = () => (
    <div className="footer">
      <span>Price: {price}</span>
      <span>Quantity: {quantity}</span>
      <Button className="btn btn-light">Add to Cart</Button>
    </div>
  );
  return <Card header={header} footer={footer} title={name}></Card>;
};

export default ProductCard;
