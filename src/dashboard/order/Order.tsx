import { Column } from "primereact/column";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { FiTrash } from "react-icons/fi";
import {
  DELETE_ORDER_KEY,
  GET_ORDER_KEY,
  UPDATE_ORDER_KEY,
} from "../../constants";
import { deleteOrder, getAllOrders, updateOrder } from "../../api/order";
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
  const { isLoading, error, data, refetch } = useQuery({
    queryKey: [GET_ORDER_KEY],
    queryFn: getAllOrders,
  });

  const { mutate: handleUpdate } = useMutation({
    mutationKey: [UPDATE_ORDER_KEY],
    mutationFn: updateOrder,
  });

  const { mutate: handleDelete } = useMutation({
    mutationKey: [DELETE_ORDER_KEY],
    mutationFn: deleteOrder,
  });

  const [type, setType] = useState<NotificationType>();
  const [orderStatus, setOrderStatus] = useState<OrderStatus>();

  if (isLoading) return <Loader />;
  if (error) return <ErrorPage error={error as AxiosError} />;

  const handleDeleteOrder = (id: string) => {
    setType(undefined);
    handleDelete(id, {
      onError: handleError,
      onSuccess: handleSuccess,
    });
  };

  const handleSuccess = () => {
    setType("success");
    refetch({ queryKey: [GET_ORDER_KEY] });
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

  const deleteOrderBody = (id: string) => (
    <FiTrash
      onClick={() => handleDeleteOrder(id)}
      className="action-button text-danger"
    />
  );

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
      <Notification setType={setType} type={type} title="Order" />
      <h1 className="text-info">Orders</h1>
      <DataTable paginator rows={5} className="col-md-10 mx-auto" value={data}>
        <Column
          sortable
          header="Order Date"
          body={(data: IOrder) => dateColumnBody(data.orderDate)}
        />
        <Column sortable field="productPrice" header="Price" />
        <Column header="Order Status" body={orderStatusBody} />
        <Column
          header="Requested Date"
          body={(data: IOrder) => dateColumnBody(data.requestedDate)}
        />
        <Column
          header="Shipped Date"
          body={(data: IOrder) => dateColumnBody(data.shippedDate)}
        />
        <Column
          header="Delete"
          body={(data: IOrder) => deleteOrderBody(data?.id as string)}
        />
      </DataTable>
    </section>
  );
};

export default Order;
