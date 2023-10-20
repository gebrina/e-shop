import { useQuery } from "@tanstack/react-query";
import { GET_CART_KEY } from "../../constants";
import { getAllCarts } from "../../api/cart";
import Loader from "../../components/loader";
import ErrorPage from "../../components/error";
import { AxiosError } from "axios";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { IProduct } from "../../types/product";
import { Button } from "primereact/button";
import { FiTrash } from "react-icons/fi";

const Cart = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: [GET_CART_KEY],
    queryFn: getAllCarts,
  });

  if (isLoading) return <Loader />;

  if (error) return <ErrorPage error={error as AxiosError} />;

  const productsInCartBody = (product: IProduct) => {};

  const deleteBody = () => (
    <Button className="btn btn-danger">
      <FiTrash className="action-btn" />
    </Button>
  );

  return (
    <section className="container col-md-6 mx-auto">
      <DataTable value={data} rows={5} paginator>
        <Column header="User" field="user" />
        <Column header="Total Price" field="total" />
        <Column header="Quantity" body={(data) => productsInCartBody(data)} />
        <Column header="Delete" body={deleteBody} />
      </DataTable>
    </section>
  );
};

export default Cart;
