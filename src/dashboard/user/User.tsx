import { useQuery } from "@tanstack/react-query";
import { GET_USER_KEY } from "../../constants";
import { getAllUsers } from "../../api/user";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import ErrorPage from "../../components/error";

const User = () => {
  const { isLoading, error, data } = useQuery({
    queryKey: [GET_USER_KEY],
    queryFn: getAllUsers,
  });
  if (error) return <ErrorPage />;

  return (
    <section className="my-3 bg-light mx-auto col-md-6">
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
