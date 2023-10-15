import { useEcomContext } from "../../../context/EcomContext";
import "./Checkout.scss";

export const Checkout = () => {
  const { productsInCart } = useEcomContext();

  return (
    <section className="container my-5">
      <section className="row">
        <section className="col-md-8 shadow-sm py-2 px-3 rounded mx-auto">
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
        </section>
      </section>
    </section>
  );
};
