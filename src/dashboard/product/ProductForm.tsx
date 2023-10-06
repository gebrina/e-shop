import { FC, useEffect, useState } from "react";
import { useFormik } from "formik";
import { Card } from "primereact/card";
import { Action } from "../common/Buttons";
import { InputText } from "primereact/inputtext";
import { Editor, EditorTextChangeEvent } from "primereact/editor";
import { Button } from "primereact/button";
import { FiSave } from "react-icons/fi";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Dropdown } from "primereact/dropdown";
import {
  CREATE_PRODUCT_KEY,
  GET_PRODUCT_CATEGORY_KEY,
  GET_PRODUCT_KEY,
  UPDATE_PRODUCT_KEY,
} from "../../constants";
import { createProduct, updateProduct } from "../../api/product";
import Notification, { NotificationType } from "../common/Notification";
import { productValidation } from "../../utils/validations";
import { getAllProductCategories } from "../../api/product-category";
import { IProduct } from "../../types/product";

type ProductFormProps = {
  action: Action;
  product?: IProduct;
};

const ProductForm: FC<ProductFormProps> = ({ action, product }) => {
  const initialValues = {
    name: "",
    price: 0,
    description: "",
    quantity: 0,
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
    onSubmit: () =>
      action == "add" ? handleCreateProduct() : handleUpdateProduct(),
  });

  const client = useQueryClient();

  const { mutate: createNewProduct } = useMutation({
    mutationKey: [CREATE_PRODUCT_KEY],
    mutationFn: createProduct,
  });

  const { mutate: handleUpdate } = useMutation({
    mutationKey: [UPDATE_PRODUCT_KEY],
    mutationFn: updateProduct,
  });

  const [type, setType] = useState<NotificationType>();

  const title = (action == "add" ? "Add" : "Update") + " Product";

  const handleSuccess = () => {
    setType("success");
    client.invalidateQueries([GET_PRODUCT_KEY]);
    resetForm();
  };

  const handleUpdateProduct = () => {
    handleUpdate(
      { id: product?.id, ...values },
      {
        onError: () => setType("error"),
        onSuccess: handleSuccess,
      }
    );
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

  useEffect(() => {
    if (product) {
      setFieldValue("name", product?.name ?? "");
      setFieldValue("price", product?.price ?? 0);
      setFieldValue("quantity", product?.quantity);
      setFieldValue("category", product?.category?.id);

      //wait until editor renders fully
      setTimeout(() => {
        setFieldValue("description", product?.description);
      }, 200);
    }
  }, [product, setFieldValue]);

  return (
    <section className="col-md-8 my-5 mx-auto">
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
                  type={"number"}
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
                  optionValue={"id"}
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
                setFieldValue("description", e.htmlValue)
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
