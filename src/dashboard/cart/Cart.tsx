import { useMutation, useQuery } from "@tanstack/react-query";
import { DELETE_CART_KEY, GET_CART_KEY } from "../../constants";
import { deleteCart, getAllCarts } from "../../api/cart";
import Loader from "../../components/loader";
import ErrorPage from "../../components/error";
import { AxiosError } from "axios";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { FiTrash } from "react-icons/fi";
import { ICart } from "../../types/Cart";
import { useState } from "react";
import Notification, { NotificationType } from "../common/Notification";

const Cart = () => {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: [GET_CART_KEY],
    queryFn: getAllCarts,
  });

  const { mutate: deleteProductsInCart } = useMutation({
    mutationKey: [DELETE_CART_KEY],
    mutationFn: deleteCart,
  });

  const [type, setType] = useState<NotificationType>();

  if (isLoading) return <Loader />;

  if (error) return <ErrorPage error={error as AxiosError} />;

  const productsInCartBody = (cart: any) => {
    return <span>{cart.prodcuts?.length}</span>;
  };

  const handleSuccess = () => {
    setType("success");
    refetch();
  };

  const handleError = () => {
    setType("error");
  };

  const handleDeleteCart = (id: string) => {
    deleteProductsInCart(id, {
      onSuccess: handleSuccess,
      onError: handleError,
    });
  };

  const deleteBody = (cart: ICart) => (
    <FiTrash
      onClick={() => handleDeleteCart(cart.id ?? "")}
      className="action-button text-danger"
    />
  );

  return (
    <section className="container col-md-6 mx-auto">
      <Notification title="Cart" type={type} setType={setType} />
      <DataTable value={data} rows={5} paginator>
        <Column header="User" field="user.username" />
        <Column header="$ Total Price" field="total" />
        <Column header="# Quantity" body={(data) => productsInCartBody(data)} />
        <Column header="Delete" body={deleteBody} />
      </DataTable>
    </section>
  );
};

export default Cart;
