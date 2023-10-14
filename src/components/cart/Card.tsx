import { FC } from "react";
import { CartProduct } from "../../context/EcomContext";

type CardProps = {
  cart: CartProduct;
};

export const Card: FC<CardProps> = ({ cart }) => {
  const { product, quantity } = cart;
  const { name } = product;
  const cardHeader = () => <h3>{name}</h3>;

  return <section>Card</section>;
};
