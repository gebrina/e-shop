import { useQuery } from "@tanstack/react-query";
import { GET_USER_KEY } from "../../constants";
import { getAllUsers } from "../../api/user";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

const User = () => {
  const { isLoading, error, data } = useQuery({
    queryKey: [GET_USER_KEY],
    queryFn: getAllUsers,
  });
  console.log(data);
  return (
    <section>
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
