import { useState } from "react";
import { Column, ColumnBodyOptions } from "primereact/column";
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

  const handleDelete = (value: ColumnBodyOptions) => {
    console.log(value);
  };

  const handleUpdate = (value: ColumnBodyOptions) => {
    console.log(value);
  };

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
            body={(options: ColumnBodyOptions) => (
              <ActionButtons
                handleDelete={() => handleDelete(options)}
                handleUpdate={() => handleUpdate(options)}
              />
            )}
          />
        </DataTable>
      )}
    </section>
  );
};

export default Product;
