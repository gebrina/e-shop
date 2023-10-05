import { FC } from "react";
import { useFormik } from "formik";
import { Card } from "primereact/card";
import { Action } from "../common/Buttons";
import { InputText } from "primereact/inputtext";
import { Editor } from "primereact/editor";
import { Button } from "primereact/button";
import { FiSave } from "react-icons/fi";

type ProductFormProps = {
  action: Action;
};
const ProductForm: FC<ProductFormProps> = ({ action }) => {
  const initialValues = {
    name: "",
    price: undefined,
    description: "",
    quantity: undefined,
  };

  const title = (action == "add" ? "Add" : "Update") + " Product";

  const { values, errors, touched, handleChange, handleSubmit, handleReset } =
    useFormik({
      initialValues,
      onSubmit: () => {},
    });

  return (
    <section className="col-md-6 mx-auto">
      <Card title={title}>
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
              <small className="text-center text-danger">{errors.price}</small>
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
            <Editor
              name="description"
              id="description"
              value={values.description}
              onChange={handleChange}
            />
            {errors.description && touched.description && (
              <small className="text-danger text-center">
                {errors.description}
              </small>
            )}
          </div>
          <Button className="btn btn-outline-success mt-4 w-100">
            <FiSave />
            &nbsp; Save
          </Button>
        </form>
      </Card>
    </section>
  );
};

export default ProductForm;
