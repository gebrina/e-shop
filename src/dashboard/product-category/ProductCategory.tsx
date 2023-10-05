import { useState } from "react";
import PCForm from "./PCForm";
import {
  DashButtons,
  filterApply,
  filterClear,
  filterElement,
} from "../common";
import { DataTable } from "primereact/datatable";
import { Column, ColumnBodyOptions } from "primereact/column";
import { Action } from "../common/Buttons";
import { useQuery } from "@tanstack/react-query";
import { getAllProductCategories } from "../../api/product-category";
import { FiEdit, FiTrash } from "react-icons/fi";
import { GET_PRODUCT_CATEGORY_KEY } from "../../constants";
import { IProductCategory } from "../../types/product-category";

const ProductCategory = () => {
  const [action, setAction] = useState<Action>();
  const { isLoading, data } = useQuery({
    queryKey: [GET_PRODUCT_CATEGORY_KEY],
    queryFn: getAllProductCategories,
  });
  const [productCategory, setProductCategory] = useState<IProductCategory>({});

  const handleClick = () => {
    if (action) {
      setAction(undefined);
    } else {
      setAction("add");
    }
  };

  const handleUpdate = (options: ColumnBodyOptions) => {
    setProductCategory({
      id: options.id,
      name: options.name,
      description: options.description,
    });
    setAction("update");
  };

  const actionBodyTemplates = (options: ColumnBodyOptions) => {
    return (
      <div className="w-100 d-flex gap-2">
        <FiEdit
          onClick={() => handleUpdate(options)}
          className="text-success action-button"
        />
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
      {action && <PCForm productCategory={productCategory} action={action} />}
      {isLoading ? (
        "Loading..."
      ) : (
        <div className="bg-light col-md-6 mx-auto">
          <DataTable paginator rows={5} value={data}>
            <Column
              header="Name"
              showFilterMatchModes={false}
              filter
              filterClear={filterClear}
              filterApply={filterApply}
              showFilterMenuOptions={false}
              filterElement={filterElement}
              field="name"
            />
            <Column header="Description" field={"description"} />
            <Column header={"Action"} colSpan={2} body={actionBodyTemplates} />
          </DataTable>
        </div>
      )}
    </section>
  );
};

export default ProductCategory;
