import { FC, useState } from "react";
import { CartProduct, useEcomContext } from "../../context/EcomContext";
import { InputNumber } from "primereact/inputnumber";
import { Button } from "primereact/button";
import { FiTrash2 } from "react-icons/fi";

type CardProps = {
  cart: CartProduct;
};

export const CartCard: FC<CardProps> = ({ cart }) => {
  const { handleRemoveFromCart, handleAddToCart } = useEcomContext();
  const { product, quantity: cartQuantity } = cart;
  const { name, category, image, price, id } = product;

  const updateProductQuantity = (value: number) => {
    if (value > 0) {
      handleAddToCart && handleAddToCart(product, value);
    }
  };

  return (
    <section className="bg-light shadow mb-3">
      <div className="px-2">
        <h3 className="category">{category?.name}</h3>
        <h5 className="text-success">{name}</h5>
      </div>

      <section className="product-info">
        <img src={import.meta.env.VITE_APP_API_URL + image} />
        <div className="price-container">
          <p className="border price px-2  fw-bold rounded">
            Price: $ {cartQuantity * (price ?? 0)}
          </p>
          <div className="quantity">
            <div className="input-container">
              <label htmlFor="quantity">Quantity</label>
              <InputNumber
                onChange={(e) => updateProductQuantity(e.value ?? 0)}
                placeholder="ex. 1"
                id="quantity"
                value={cartQuantity}
              />
            </div>
            <Button
              onClick={() =>
                handleRemoveFromCart && handleRemoveFromCart(id ?? "")
              }
              className="btn  p-0 mt-3  text-danger fs-4"
            >
              <FiTrash2 className="action-btn" />
            </Button>
          </div>
        </div>
      </section>
    </section>
  );
};
