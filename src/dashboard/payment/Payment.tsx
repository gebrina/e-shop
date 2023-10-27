import { useQuery } from "@tanstack/react-query";
import { GET_PAYMENT_KEY } from "../../constants";
import { getPayment } from "../../api/payment";
import Loader from "../../components/loader";
import ErrorPage from "../../components/error";
import { AxiosError } from "axios";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { IPayment } from "../../types/Payment";
import { FiTrash } from "react-icons/fi";
import { getFormatedDate } from "../../utils";

export const Payment = () => {
  const { isLoading, data, error } = useQuery({
    queryKey: [GET_PAYMENT_KEY],
    queryFn: getPayment,
  });

  if (isLoading) return <Loader />;

  if (error) return <ErrorPage error={error as AxiosError} />;

  const paymentDateBody = (payment: IPayment) => (
    <span>{getFormatedDate(payment.paymentDate)}</span>
  );

  const userColumnBody = (payment: IPayment) => (
    <span>{payment.user?.username}</span>
  );

  const actionColumnBody = (payment: IPayment) => (
    <FiTrash className="action-button text-danger" />
  );

  return (
    <section className="container my-5">
      <h1 className="text-info my-4">Payments</h1>
      <DataTable
        paginator
        rows={5}
        rowsPerPageOptions={[5, 10, 50, 100]}
        value={data}
      >
        <Column header="Amount" field="amount" />
        <Column header="User" body={userColumnBody} />
        <Column header="Payment Date" body={paymentDateBody} />
        <Column header="Action" body={actionColumnBody} />
      </DataTable>
    </section>
  );
};
