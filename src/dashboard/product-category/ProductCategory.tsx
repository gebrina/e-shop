import { useState } from "react";
import PCForm from "./PCForm";
import {
  DashButtons,
  filterApply,
  filterClear,
  filterElement,
} from "../common";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Action } from "../common/Buttons";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  deleteProductCategory,
  getAllProductCategories,
} from "../../api/product-category";
import { FiEdit, FiTrash } from "react-icons/fi";
import {
  DELETE_PRODUCT_CATEGORY_KEY,
  GET_PRODUCT_CATEGORY_KEY,
} from "../../constants";
import { IProductCategory } from "../../types/product-category";
import Notification, { NotificationType } from "../common/Notification";
import Loader from "../../components/loader";
import ErrorPage from "../../components/error";
import { AxiosError } from "axios";

const ProductCategory = () => {
  const [action, setAction] = useState<Action>();
  const [type, setType] = useState<NotificationType>();
  const { isLoading, data, error } = useQuery({
    queryKey: [GET_PRODUCT_CATEGORY_KEY],
    queryFn: getAllProductCategories,
  });

  const queryClient = useQueryClient();

  const { mutate: handleDelete } = useMutation({
    mutationKey: [DELETE_PRODUCT_CATEGORY_KEY],
    mutationFn: deleteProductCategory,
  });

  const [productCategory, setProductCategory] = useState<IProductCategory>();

  const handleClick = () => {
    if (action) {
      setAction(undefined);
    } else {
      setAction("add");
      setProductCategory(undefined);
    }
  };

  const handleDeleteProCatgory = (options: IProductCategory) => {
    setType(undefined);
    handleDelete(options.id as string, {
      onError: () => setType("error"),
      onSuccess: () => {
        setType("success");
        queryClient.invalidateQueries([GET_PRODUCT_CATEGORY_KEY]);
      },
    });
  };

  const handleUpdate = (options: IProductCategory) => {
    setProductCategory({
      id: options.id,
      name: options.name,
      description: options.description,
    });
    setAction("update");
  };

  const actionBodyTemplates = (options: IProductCategory) => {
    return (
      <div className="w-100 d-flex gap-2">
        <FiEdit
          onClick={() => handleUpdate(options)}
          className="text-success action-button"
        />
        <FiTrash
          onClick={() => handleDeleteProCatgory(options)}
          className="text-danger action-button"
        />
      </div>
    );
  };
  if (isLoading) return <Loader />;

  if (error) return <ErrorPage error={error as AxiosError} />;

  return (
    <section className="my-3 container">
      <DashButtons
        title="Product Categories"
        text=""
        action={action}
        onClick={handleClick}
      />
      {type && (
        <Notification setType={setType} type={type} title="Product Category" />
      )}
      {action && <PCForm productCategory={productCategory} action={action} />}

      <div className="bg-light  my-5 col-md-6 mx-auto">
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
    </section>
  );
};

export default ProductCategory;
