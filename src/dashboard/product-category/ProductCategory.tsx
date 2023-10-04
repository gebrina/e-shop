import { useState } from "react";
import PCForm from "./PCForm";
import { DashButtons } from "../common";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { Action } from "../common/Buttons";
import { useQuery } from "@tanstack/react-query";
import { getAllProductCategories } from "../../api/product-category";
import { FiEdit, FiTrash } from "react-icons/fi";

const ProductCategory = () => {
  const [action, setAction] = useState<Action>();
  const { isLoading, error, data } = useQuery({
    queryKey: ["get-procat"],
    queryFn: getAllProductCategories,
  });

  const handleClick = () => {
    if (action) {
      setAction(undefined);
    } else {
      setAction("add");
    }
  };

  const actionBodyTemplates = () => {
    return (
      <div className="w-100 d-flex gap-2">
        <FiEdit className="text-success action-button" />
        <FiTrash className="text-danger action-button" />
      </div>
    );
  };

  return (
    <section className="my-3">
      <DashButtons
        title="Product Categories"
        text=""
        action={action}
        onClick={handleClick}
      />
      {action && <PCForm action={action} />}
      {isLoading ? (
        "Loading..."
      ) : (
        <div className="bg-light col-md-6 mx-auto">
          <DataTable paginator rows={5} r value={data}>
            <Column header="Name" filter field="name" />
            <Column header="Description" field={"description"} />
            <Column header={"Action"} colSpan={2} body={actionBodyTemplates} />
          </DataTable>
        </div>
      )}
    </section>
  );
};

export default ProductCategory;
