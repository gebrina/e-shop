import { useEcomContext } from "../../../context/EcomContext";
import "./Checkout.scss";

export const Checkout = () => {
  const { productsInCart } = useEcomContext();

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
          <div className="right-items px-2">
            <p
              title={"Sum of sub totals"}
              className="fs-5 fw-bold bg-info rounded text-white border px-2"
            >
              Total: ${totalCartProducsPrice}
            </p>
          </div>
        </section>
      </section>
    </section>
  );
};
