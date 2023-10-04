import { useState } from "react";
import PCForm from "./PCForm";
import { DashButtons } from "../common";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { Action } from "../common/Buttons";
import { useQuery } from "@tanstack/react-query";
import { getAllProductCategories } from "../../api/product-category";

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
          <DataTable value={data}>
            <Column filter field="name" />
            <Column field="description" />
          </DataTable>
        </div>
      )}
    </section>
  );
};

export default ProductCategory;
