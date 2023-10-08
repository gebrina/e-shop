import { useQuery } from "@tanstack/react-query";
import { GET_USER_KEY } from "../../constants";
import { getAllUsers } from "../../api/user";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import ErrorPage from "../../components/error";
import { AxiosError } from "axios";
import Loader from "../../components/loader";

const User = () => {
  const { isLoading, error, data } = useQuery({
    queryKey: [GET_USER_KEY],
    queryFn: getAllUsers,
  });

  if (isLoading) return <Loader />;
  if (error) return <ErrorPage error={(error as AxiosError).message} />;

  return (
    <section className="my-3 bg-light mx-auto col-md-6">
      <h1 className="text-info my-2">Users</h1>
      {!isLoading && (
        <DataTable value={data} paginator rows={5}>
          <Column field="username" header="Name" />
          <Column field="email" header="Email" />
        </DataTable>
      )}
    </section>
  );
};

export default User;
