import { FC } from "react";
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import { NavLink } from "react-router-dom";
import { FiPlus } from "react-icons/fi";
import { IProduct } from "../../types/product";
import { useEcomContext } from "../../context/EcomContext";

type ProductCardProps = {
  product: IProduct;
};

const ProductCard: FC<ProductCardProps> = ({ product }) => {
  const { handleAddToCart, handleRemoveFromCart } = useEcomContext();
  const { name, price, quantity, id, category, image } = product;

  const header = () => (
    <NavLink to={`/products/${id}`}>
      <img src={import.meta.env.VITE_APP_API_URL + image} alt={name} />
    </NavLink>
  );

  const addToCart = () => handleAddToCart && handleAddToCart(product);

  const footer = () => (
    <div className="footer d-flex justify-content-between align-items-end">
      <span className="bg-light rounded border text-black px-2 py-1">
        Price: ${price}
      </span>
      <span className="bg-light rounded text-black border px-2 py-1">
        Quantity: {quantity}
      </span>
      <Button
        onClick={addToCart}
        className="btn text-success border py-1 center-items btn-light"
      >
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
      title={
        <NavLink className="link" to={`/products/${id}`}>
          {name}
        </NavLink>
      }
    ></Card>
  );
};

export default ProductCard;
