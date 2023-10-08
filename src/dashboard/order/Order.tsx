import { Column } from "primereact/column";
import { QueryClient, useMutation, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { FiTrash } from "react-icons/fi";
import { GET_ORDER_KEY, UPDATE_ORDER_KEY } from "../../constants";
import { getAllOrders, updateOrder } from "../../api/order";
import ErrorPage from "../../components/error";
import Loader from "../../components/loader";
import { DataTable } from "primereact/datatable";
import { IOrder } from "../../types/Order";
import { Dropdown } from "primereact/dropdown";
import { OrderStatus, statusOptions } from "./OrderStatus";
import { getFormatedDate } from "../../utils";
import { AxiosError } from "axios";
import Notification, { NotificationType } from "../common/Notification";

const Order = () => {
  const { isLoading, error, data } = useQuery({
    queryKey: [GET_ORDER_KEY],
    queryFn: getAllOrders,
  });

  const client = new QueryClient();

  const { mutate: handleUpdate } = useMutation({
    mutationKey: [UPDATE_ORDER_KEY],
    mutationFn: updateOrder,
  });

  const [type, setType] = useState<NotificationType>();
  const [orderStatus, setOrderStatus] = useState<OrderStatus>();

  if (isLoading) return <Loader />;
  if (error) return <ErrorPage error={(error as AxiosError)?.message} />;

  const handleDelete = () => {};

  const deleteOrderBody = () => (
    <FiTrash onClick={handleDelete} className="action-button text-danger" />
  );

  const handleSuccess = () => {
    setType("success");
    client.invalidateQueries([GET_ORDER_KEY]);
  };

  const handleError = () => {
    setType("error");
  };

  const handleChangeOrderStatus = (
    id: string,
    status: number,
    order?: IOrder
  ) => {
    setType(undefined);
    setOrderStatus({ id, status });

    handleUpdate(
      {
        ...order,
        status,
      },
      {
        onSuccess: handleSuccess,
        onError: handleError,
      }
    );
  };

  const orderStatusBody = (data: IOrder) => {
    return (
      <Dropdown
        value={orderStatus?.id == data.id ? orderStatus?.status : data.status}
        onChange={(e) =>
          handleChangeOrderStatus(data?.id as string, e.value, data)
        }
        className="px-0 center-items"
        optionLabel="label"
        options={statusOptions}
      />
    );
  };

  const dateColumnBody = (date: string | undefined) => (
    <span>{getFormatedDate(date as string)}</span>
  );

  return (
    <section className="my-5">
      <Notification type={type} title="Order" />
      <h1 className="text-info">Orders</h1>
      <DataTable paginator rows={5} className="col-md-10 mx-auto" value={data}>
        <Column
          header="Order Date"
          body={(data: IOrder) => dateColumnBody(data.orderDate)}
        />
        <Column field="productPrice" header="Price" />
        <Column header="Order Status" body={orderStatusBody} />
        <Column
          header="Requested Date"
          body={(data: IOrder) => dateColumnBody(data.requestedDate)}
        />
        <Column
          header="Shipped Date"
          body={(data: IOrder) => dateColumnBody(data.shippedDate)}
        />
        <Column header="Delete" body={deleteOrderBody} />
      </DataTable>
    </section>
  );
};

export default Order;
