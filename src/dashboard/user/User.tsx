import { useQuery } from "@tanstack/react-query";
import { GET_USER_KEY } from "../../constants";
import { getAllUsers } from "../../api/user";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import ErrorPage from "../../components/error";
import { AxiosError } from "axios";
import Loader from "../../components/loader";
import { useState } from "react";
import Notification, { NotificationType } from "../common/Notification";
import { IUser } from "../../types/user";
import { FiTrash } from "react-icons/fi";

const User = () => {
  const { isLoading, error, data } = useQuery({
    queryKey: [GET_USER_KEY],
    queryFn: getAllUsers,
  });

  const [type, setType] = useState<NotificationType>();

  if (isLoading) return <Loader />;
  if (error) return <ErrorPage error={error as AxiosError} />;

  const handleDelete = (id?: string) => {};
  const deleteColumBody = (user: IUser) => (
    <FiTrash
      onClick={() => handleDelete(user.id)}
      className="action-button text-danger"
    />
  );

  return (
    <section className="my-3 bg-light mx-auto col-md-6">
      <Notification type={type} setType={setType} title="Users" />
      <h1 className="text-info my-2">Users</h1>

      <DataTable value={data} paginator rows={5}>
        <Column field="username" header="Name" />
        <Column field="email" header="Email" />
        <Column header="Delete" body={deleteColumBody} />
      </DataTable>
    </section>
  );
};

export default User;
