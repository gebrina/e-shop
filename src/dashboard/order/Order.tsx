import { Column } from "primereact/column";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { FiTrash } from "react-icons/fi";
import { GET_ORDER_KEY } from "../../constants";
import { getAllOrders } from "../../api/order";
import ErrorPage from "../../components/error";
import Loader from "../../components/loader";
import { DataTable } from "primereact/datatable";
import { IOrder } from "../../types/Order";
import { Dropdown } from "primereact/dropdown";
import { OrderStatus, statusOptions } from "./OrderStatus";
import { getFormatedDate } from "../../utils";
import { AxiosError } from "axios";

const Order = () => {
  const { isLoading, error, data } = useQuery({
    queryKey: [GET_ORDER_KEY],
    queryFn: getAllOrders,
  });

  const [orderStatus, setOrderStatus] = useState<OrderStatus>();

  if (isLoading) return <Loader />;
  if (error) return <ErrorPage error={(error as AxiosError)?.message} />;

  const handleDelete = () => {};

  const deleteOrderBody = () => (
    <FiTrash onClick={handleDelete} className="action-button text-danger" />
  );

  const handleChangeOrderStatus = (id: string, status: number) => {
    setOrderStatus({ id, status });
  };

  const orderStatusBody = (data: IOrder) => {
    return (
      <Dropdown
        value={orderStatus?.id == data.id ? orderStatus?.status : data.status}
        onChange={(e) => handleChangeOrderStatus(data?.id as string, e.value)}
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
