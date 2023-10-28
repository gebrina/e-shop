import { useMutation, useQuery } from "@tanstack/react-query";
import { DELETE_PAYMENT_KEY, GET_PAYMENT_KEY } from "../../constants";
import { deletePayment, getPayment } from "../../api/payment";
import Loader from "../../components/loader";
import ErrorPage from "../../components/error";
import { AxiosError } from "axios";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { IPayment } from "../../types/Payment";
import { FiTrash } from "react-icons/fi";
import { getFormatedDate } from "../../utils";
import { useState } from "react";
import Notification, { NotificationType } from "../common/Notification";

export const Payment = () => {
  const { isLoading, data, error, refetch } = useQuery({
    queryKey: [GET_PAYMENT_KEY],
    queryFn: getPayment,
  });

  const { mutate: onDeleltePayment } = useMutation({
    mutationKey: [DELETE_PAYMENT_KEY],
    mutationFn: deletePayment,
  });

  const [type, setType] = useState<NotificationType>();

  if (isLoading) return <Loader />;

  if (error) return <ErrorPage error={error as AxiosError} />;

  const paymentDateBody = (payment: IPayment) => (
    <span>{getFormatedDate(payment.paymentDate)}</span>
  );

  const userColumnBody = (payment: IPayment) => (
    <span>{payment.user?.username}</span>
  );

  const handleSuccess = () => {
    setType("success");
    refetch();
  };

  const handleError = () => {
    setType("error");
    refetch();
  };

  const handleDeletePayment = (id: string) => {
    onDeleltePayment(id, {
      onSuccess: handleSuccess,
      onError: handleError,
    });
  };

  const actionColumnBody = (payment: IPayment) => (
    <FiTrash
      onClick={() => handleDeletePayment(payment.id)}
      className="action-button text-danger"
    />
  );

  return (
    <section className="container my-5">
      <Notification type={type} setType={setType} title="Payment" />
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
