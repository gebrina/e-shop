import { FC } from "react";
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import { NavLink } from "react-router-dom";
import { FiPlus, FiTrash } from "react-icons/fi";
import { IProduct } from "../../types/product";
import { useEcomContext } from "../../context/EcomContext";

type ProductCardProps = {
  product: IProduct;
};

const ProductCard: FC<ProductCardProps> = ({ product }) => {
  const { handleAddToCart, productsInCart, handleRemoveFromCart } =
    useEcomContext();

  const productsInCartIndex = productsInCart?.findIndex(
    (cart) => cart.product.id == product.id
  );

  const { name, price, quantity, id, category, image } = product;

  const header = () => (
    <NavLink to={`/products/${id}`}>
      <img src={import.meta.env.VITE_APP_API_URL + image} alt={name} />
    </NavLink>
  );

  const addToCart = () => handleAddToCart && handleAddToCart(product);

  const removeProductFromCart = () =>
    handleRemoveFromCart && handleRemoveFromCart(product.id ?? "");

  const footer = () => (
    <div className="footer d-flex justify-content-between align-items-end">
      <span className="bg-light rounded border text-black px-2 py-1">
        Price: ${price}
      </span>
      <span className="bg-light rounded text-black border px-2 py-1">
        Quantity: {quantity}
      </span>
      {productsInCartIndex == -1 ? (
        <Button
          onClick={addToCart}
          className="btn text-success border py-1 center-items btn-light"
        >
          <FiPlus />
          &nbsp; Add
        </Button>
      ) : (
        <Button
          onClick={removeProductFromCart}
          className="btn text-danger border py-1 center-items btn-light"
        >
          <FiTrash />
          &nbsp; Remove
        </Button>
      )}
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
