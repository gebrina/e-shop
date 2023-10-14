import { FC } from "react";
import { CartProduct } from "../../context/EcomContext";
import { InputNumber } from "primereact/inputnumber";

type CardProps = {
  cart: CartProduct;
};

export const CartCard: FC<CardProps> = ({ cart }) => {
  const { product, quantity: cartQuantity } = cart;
  const { name, category, image, price } = product;

  return (
    <section className="bg-light shadow">
      <div className="px-2">
        <h3 className="category">{category?.name}</h3>
        <h5 className="text-success">{name}</h5>
      </div>

      <section className="product-info">
        <img src={import.meta.env.VITE_APP_API_URL + image} />
        <div>
          <p className="border price">$ {price * cartQuantity}</p>
          <div>
            <label htmlFor="quantity">Quantity</label>
            <InputNumber id="quantity" value={cartQuantity} />
          </div>
        </div>
      </section>
    </section>
  );
};
