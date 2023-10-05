import { FC } from "react";
import { useFormik } from "formik";
import { Card } from "primereact/card";
import { Action } from "../common/Buttons";

type ProductFormProps = {
  action: Action;
};
const ProductForm: FC<ProductFormProps> = ({ action }) => {
  const initialValues = {
    name: "",
    price: 0,
    description: "",
    quantity: 0,
  };
  const { values, errors, touched, handleChange, handleSubmit, handleReset } =
    useFormik({
      initialValues,
      onSubmit: () => {},
    });
  return (
    <section>
      <Card title={(action == "add" ? "Add" : "Update") + " Product"}>
        <form></form>
      </Card>
    </section>
  );
};

export default ProductForm;
