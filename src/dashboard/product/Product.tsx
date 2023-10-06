import { useState } from "react";
import { Column, ColumnBodyOptions } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Action } from "../common/Buttons";
import ProductForm from "./ProductForm";
import { DELETE_PRODUCT_KEY, GET_PRODUCT_KEY } from "../../constants";
import { deleteProduct, getAllProducts } from "../../api/product";
import {
  DashButtons,
  filterApply,
  filterClear,
  filterElement,
} from "../common";
import ActionButtons from "../common/ActionButtons";
import Notification, { NotificationType } from "../common/Notification";
import { IProduct } from "../../types/product";

const Product = () => {
  const [action, setAction] = useState<Action>();
  const [type, setType] = useState<NotificationType>();
  const [product, setProduct] = useState<IProduct>();

  const client = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: [GET_PRODUCT_KEY],
    queryFn: getAllProducts,
  });

  const { mutate: handleDeleteProduct } = useMutation({
    mutationKey: [DELETE_PRODUCT_KEY],
    mutationFn: deleteProduct,
  });

  const handleClick = () => {
    setProduct(undefined);
    if (action) {
      setAction(undefined);
    } else {
      setAction("add");
    }
  };

  const handleSuccess = () => {
    setType("success");
    client.refetchQueries([GET_PRODUCT_KEY]);
  };

  const handleDelete = (value: ColumnBodyOptions) => {
    handleDeleteProduct(value.id, {
      onSuccess: handleSuccess,
      onError: () => setType("error"),
    });
  };

  const handleUpdate = (value: ColumnBodyOptions) => {
    setAction("update");
    setProduct(value as IProduct);
  };

  return (
    <section className="mt-2">
      <DashButtons
        action={action}
        title="Product"
        text=""
        onClick={handleClick}
      />
      {action && <ProductForm action={action} product={product} />}
      <Notification type={type} title="Product" />
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
