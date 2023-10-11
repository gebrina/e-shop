import { FC } from "react";
import { IProduct } from "../../types/product";
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import { NavLink } from "react-router-dom";
import { FiPlus, FiShoppingCart } from "react-icons/fi";

type ProductCardProps = {
  product: IProduct;
};

const ProductCard: FC<ProductCardProps> = ({ product }) => {
  const { name, price, quantity, id, category, image } = product;

  const header = () => (
    <NavLink to={`/products/${id}`}>
      <img src={import.meta.env.VITE_APP_API_URL + image} alt={name} />
    </NavLink>
  );

  const footer = () => (
    <div className="footer d-flex justify-content-between align-items-end">
      <span>Price: {price}</span>
      <span>Quantity: {quantity}</span>
      <Button className="btn center-items btn-light">
        <FiPlus />
        &nbsp; Add
      </Button>
    </div>
  );
  return (
    <Card
      className="pro-card"
      header={header}
      footer={footer}
      subTitle={category?.name}
      title={name}
    ></Card>
  );
};

export default ProductCard;
