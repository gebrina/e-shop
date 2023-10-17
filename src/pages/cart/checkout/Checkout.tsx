import { useState } from "react";
import { useEcomContext } from "../../../context/EcomContext";
import "./Checkout.scss";
import { Button } from "primereact/button";
import { FiDollarSign } from "react-icons/fi";
import { Payment } from "../../../payment";

export const Checkout = () => {
  const { productsInCart } = useEcomContext();
  const [pay, setPay] = useState(false);

  let totalCartProducsPrice: number = 0;
  productsInCart?.forEach((cart) => {
    totalCartProducsPrice +=
      (cart.product.quantity && cart.product.price * cart.quantity) || 0;
  });

  return (
    <section className="container my-5">
      <section className="row">
        <section className="col-md-8 shadow-sm py-2 px-3 rounded mx-auto">
          <h2 className="text-center  my-3">Picked Products & Prices</h2>
          <table className="table table-striped   text-center table-responsive table-hover">
            <thead>
              <tr>
                <th className="bg-info text-white fs-5">Category</th>
                <th className="bg-info text-white fs-5">Name</th>
                <th className="bg-info text-white fs-5">$ Price</th>
                <th className="bg-info text-white fs-5">Quantity</th>
                <th className="bg-info text-white fs-5">$ Sub Total</th>
              </tr>
            </thead>
            <tbody>
              {productsInCart?.map((cart) => {
                const { product, quantity } = cart;
                const { id, name, price, category } = product;

                return (
                  <tr key={id}>
                    <td>{category?.name}</td>
                    <td>{name}</td>
                    <td>{price}</td>
                    <th>{quantity}</th>
                    <th>{price && price * quantity}</th>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <div className="d-flex justify-content-end align-items-center  px-2">
            <button
              title={"Sum of sub totals"}
              className="fw-bold center-items bg-info mx-3 btn rounded text-white border px-2"
            >
              Total: &nbsp;
              <FiDollarSign />
              &nbsp;{totalCartProducsPrice}
            </button>

            <Button
              onClick={() => setPay(!pay)}
              className="btn  btn-outline-success center-items"
            >
              <FiDollarSign /> &nbsp;{" "}
              {!pay ? <span>Checkout</span> : <span>Cancel</span>}
            </Button>
          </div>
        </section>
      </section>

      {pay && <Payment />}
    </section>
  );
};
