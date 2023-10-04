import { useFormik } from "formik";
import { Card } from "primereact/card";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { FC, useRef } from "react";
import { IProductCategory } from "../../types/product-category";
import { Button } from "primereact/button";
import { FiSave } from "react-icons/fi";
import { Action } from "../common/Buttons";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createProductCategory } from "../../api/product-category";
import { productCategoryValidation } from "../../utils/validations";
import { Toast } from "primereact/toast";
import { handleError, handleSuccess } from "../../utils";
import {
  CREATE_PRODUCT_CATEGORY_KEY,
  GET_PRODUCT_CATEGORY_KEY,
} from "../../constants";

export type PCFormProps = {
  action: Action;
  productCategory?: IProductCategory;
};

const PCForm: FC<PCFormProps> = ({ action }) => {
  const queryClient = useQueryClient();

  const { mutate: createProCategory, isLoading } = useMutation({
    mutationKey: [CREATE_PRODUCT_CATEGORY_KEY],
    mutationFn: createProductCategory,
  });

  const { values, handleChange, handleSubmit, errors, touched, resetForm } =
    useFormik({
      initialValues: { name: "", description: "" },
      validationSchema: productCategoryValidation,
      onSubmit: () => handleCreateProductCategory(),
    });

  const toastRef = useRef<Toast>(null);

  const handleSuccessResponse = () => {
    handleSuccess({
      summary: "Product Category",
      detail: "Product category created successfully",
      toast: toastRef.current,
    });
    queryClient.invalidateQueries([GET_PRODUCT_CATEGORY_KEY]);
    resetForm();
  };

  const handleErrorResponse = () => {
    handleError({
      summary: "Product Category",
      detail: "Failed to create product category, try again.",
      toast: toastRef.current,
    });
  };

  const handleCreateProductCategory = () => {
    createProCategory(values, {
      onSuccess: handleSuccessResponse,
      onError: handleErrorResponse,
    });
  };

  return (
    <section className="center-items">
      <Toast ref={toastRef} />
      <Card
        title={action == "add" ? "New Category" : "Update Category"}
        className="col-md-5"
      >
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <div className="p-float-label">
              <InputText
                id="name"
                className={`${errors.name && "p-invalid"} w-100`}
                value={values.name}
                name="name"
                onChange={handleChange}
              />
              <label htmlFor="name">Name</label>
            </div>
            {errors.name && touched.name && (
              <small className="text-center text-danger">{errors.name}</small>
            )}
          </div>
          <div className="mb-4">
            <div className="p-float-label">
              <InputTextarea
                id="description"
                className={`${errors.description && "p-invalid"} w-100`}
                value={values.description}
                name="description"
                onChange={handleChange}
              />
              <label htmlFor="name">Description</label>
            </div>
            {errors.description && touched.description && (
              <small className="text-center text-danger">
                {errors.description}
              </small>
            )}
          </div>
          <Button className="btn w-100 center-items btn-outline-success">
            <FiSave />
            <span className="px-2"> {isLoading ? "Saving..." : "Save"}</span>
          </Button>
        </form>
      </Card>
    </section>
  );
};

export default PCForm;
