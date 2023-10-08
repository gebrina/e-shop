import { useQuery } from "@tanstack/react-query";
import { GET_ORDER_KEY } from "../../constants";
import { getAllOrders } from "../../api/order";
import ErrorPage from "../../components/error";
import Loader from "../../components/loader";
import { DataTable } from "primereact/datatable";
import { Column, ColumnBodyOptions } from "primereact/column";
import { FiTrash } from "react-icons/fi";
import { IOrder } from "../../types/Order";
import { Dropdown } from "primereact/dropdown";

type OrderStatusOptions = {
  label: string;
  value: number;
};

const Order = () => {
  const { isLoading, error, data } = useQuery({
    queryKey: [GET_ORDER_KEY],
    queryFn: getAllOrders,
  });

  const statusOptions: OrderStatusOptions[] = [
    {
      label: "Pending",
      value: 0,
    },
    {
      label: "Sent",
      value: 1,
    },
    {
      label: "Received",
      value: 2,
    },
  ];

  if (isLoading) return <Loader />;
  if (error) return <ErrorPage error={error?.message} />;

  const handleDelete = () => {};

  const deleteOrderBody = () => (
    <FiTrash onClick={handleDelete} className="action-button text-danger" />
  );

  const orderStatusBody = (data: IOrder, options: ColumnBodyOptions) => {
    console.log(data);
    return (
      <Dropdown
        className="px-0 center-items"
        optionLabel="label"
        options={statusOptions}
      />
    );
  };

  return (
    <section className="my-5">
      <h1 className="text-info">Orders</h1>
      <DataTable paginator rows={5} className="col-md-8 mx-auto" value={data}>
        <Column field="orderDate" header="Order Date" />
        <Column field="productPrice" header="Price" />
        <Column field="status" header="Order Status" />
        <Column field="requestedDate" header="Requested Date" />
        <Column field="shippedDate" header="Shipped Date" />
        <Column header="Delete Order" body={orderStatusBody} />
      </DataTable>
    </section>
  );
};

export default Order;
