import { useQuery } from "@tanstack/react-query";
import { GET_ORDER_KEY } from "../../constants";
import { getAllOrders } from "../../api/order";
import ErrorPage from "../../components/error";
import Loader from "../../components/loader";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { FiTrash } from "react-icons/fi";

const Order = () => {
  const { isLoading, error, data } = useQuery({
    queryKey: [GET_ORDER_KEY],
    queryFn: getAllOrders,
  });

  if (isLoading) return <Loader />;
  if (error) return <ErrorPage error={error?.message} />;

  const deleteOrderBody = () => <FiTrash className="action-button" />;

  return (
    <section className="my-5">
      <h1 className="text-info">Orders</h1>
      <DataTable paginator rows={5} className="col-md-8 mx-auto" value={data}>
        <Column field="productPrice" header="Price" />
        <Column field="orderDate" header="Order Date" />
        <Column field="shippedDate" header="Shipped Date" />
        <Column field="requestedDate" header="Requested Date" />
        <Column field="status" header="Order Status" />
        <Column header="Delete Order" body={deleteOrderBody} />
      </DataTable>
    </section>
  );
};

export default Order;
