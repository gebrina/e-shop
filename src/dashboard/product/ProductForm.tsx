import { FC, useState } from "react";
import { useFormik } from "formik";
import { Card } from "primereact/card";
import { Action } from "../common/Buttons";
import { InputText } from "primereact/inputtext";
import { Editor, EditorTextChangeEvent } from "primereact/editor";
import { Button } from "primereact/button";
import { FiSave } from "react-icons/fi";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  CREATE_PRODUCT_KEY,
  GET_PRODUCT_CATEGORY_KEY,
  GET_PRODUCT_KEY,
} from "../../constants";
import { createProduct } from "../../api/product";
import Notification, { NotificationType } from "../common/Notification";
import { productValidation } from "../../utils/validations";
import { getAllProductCategories } from "../../api/product-category";
import { Dropdown } from "primereact/dropdown";
import { IProductCategory } from "../../types/product-category";

type ProductFormProps = {
  action: Action;
};

const ProductForm: FC<ProductFormProps> = ({ action }) => {
  const initialValues = {
    name: "",
    price: undefined,
    description: "",
    quantity: undefined,
    category: "",
  };

  const { data, isLoading } = useQuery({
    queryKey: [GET_PRODUCT_CATEGORY_KEY],
    queryFn: getAllProductCategories,
  });

  const {
    values,
    errors,
    touched,
    setFieldValue,
    handleChange,
    handleSubmit,
    resetForm,
  } = useFormik({
    initialValues,
    validationSchema: productValidation,
    onSubmit: () => handleCreateProduct(),
  });

  const client = useQueryClient();

  const { mutate: createNewProduct } = useMutation({
    mutationKey: [CREATE_PRODUCT_KEY],
    mutationFn: createProduct,
  });

  const [type, setType] = useState<NotificationType>();

  const title = (action == "add" ? "Add" : "Update") + " Product";

  const handleSuccess = () => {
    setType("success");
    client.invalidateQueries([GET_PRODUCT_KEY]);
    resetForm();
  };

  const handleCreateProduct = () => {
    const newProduct = Object.assign({}, values, {
      category: values.category?.id,
    });

    createNewProduct(newProduct, {
      onError: () => setType("error"),
      onSuccess: handleSuccess,
    });
  };

  return (
    <section className="col-md-8 mx-auto">
      {type && <Notification type={type} title="Product" />}
      <Card title={title}>
        <form onSubmit={handleSubmit} className="row">
          <div className="col-md-6">
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
                <InputText
                  type="number"
                  id="price"
                  className={`${errors.price && "p-invalid"} w-100`}
                  value={values.price}
                  name="price"
                  onChange={handleChange}
                />
                <label htmlFor="name">Price</label>
              </div>
              {errors.price && touched.price && (
                <small className="text-center text-danger">
                  {errors.price}
                </small>
              )}
            </div>

            <div className="mb-4">
              <div className="p-float-label">
                <InputText
                  id="quantity"
                  type={"number"}
                  className={`${errors.quantity && "p-invalid"} w-100`}
                  value={values.quantity}
                  name="quantity"
                  onChange={handleChange}
                />
                <label htmlFor="quantity">Quantity</label>
              </div>
              {errors.quantity && touched.quantity && (
                <small className="text-center text-danger">
                  {errors.quantity}
                </small>
              )}
            </div>
            <div>
              <span className="p-float-label">
                <Dropdown
                  name="category"
                  inputId="dd-category"
                  value={values.category}
                  onChange={handleChange}
                  options={data}
                  optionLabel="name"
                  className="w-100"
                />
                <label htmlFor="dd-category">
                  {isLoading ? "Loading..." : "Product Category"}
                </label>
              </span>
              {touched.category && errors.category && (
                <small className="text-center text-danger">
                  {errors.category}
                </small>
              )}
            </div>
          </div>

          <div className="col-md-6">
            <Editor
              name="description"
              style={{ height: 138 }}
              id="description"
              value={values.description}
              onTextChange={(e: EditorTextChangeEvent) =>
                setFieldValue("description", e.textValue)
              }
            />
            {errors.description && touched.description && (
              <small className="text-danger text-center">
                {errors.description}
              </small>
            )}

            <Button className="btn btn-outline-success mt-4 w-100">
              <FiSave />
              &nbsp; Save
            </Button>
          </div>
        </form>
      </Card>
    </section>
  );
};

export default ProductForm;
