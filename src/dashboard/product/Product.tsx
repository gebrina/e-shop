import { useState } from "react";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { useQuery } from "@tanstack/react-query";
import { Action } from "../common/Buttons";
import ProductForm from "./ProductForm";
import { GET_PRODUCT_KEY } from "../../constants";
import { getAllProducts } from "../../api/product";
import {
  DashButtons,
  filterApply,
  filterClear,
  filterElement,
} from "../common";
import ActionButtons from "../common/ActionButtons";

const Product = () => {
  const [action, setAction] = useState<Action>();
  const { data, isLoading, isError } = useQuery({
    queryKey: [GET_PRODUCT_KEY],
    queryFn: getAllProducts,
  });

  const handleClick = () => {
    if (action) {
      setAction(undefined);
    } else {
      setAction("add");
    }
  };

  const handleDelete = (id: string) => {};

  const handleUpdate = (value: any) => {};

  return (
    <section className="mt-2">
      <DashButtons
        action={action}
        title="Product"
        text=""
        onClick={handleClick}
      />
      {action && <ProductForm action={action} />}
      {isLoading ? (
        "Loading..."
      ) : (
        <DataTable className="col-md-6 mx-auto" value={data} paginator rows={5}>
          <Column
            filter
            field="name"
            header="Name"
            showFilterMenuOptions={false}
            filterElement={filterElement}
            filterApply={filterApply}
            filterClear={filterClear}
          />

          <Column
            filter
            field="price"
            header="Price"
            showFilterMenuOptions={false}
            filterElement={filterElement}
            filterApply={filterApply}
            filterClear={filterClear}
          />

          <Column
            filter
            field="quantity"
            header="Quantity"
            showFilterMenuOptions={false}
            filterElement={filterElement}
            filterApply={filterApply}
            filterClear={filterClear}
          />
          <Column
            header="Action"
            body={
              <ActionButtons
                handleDelete={handleDelete}
                handleUpdate={handleUpdate}
              />
            }
          />
        </DataTable>
      )}
    </section>
  );
};

export default Product;
