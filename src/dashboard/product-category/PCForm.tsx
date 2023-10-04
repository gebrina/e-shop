import { useFormik } from "formik";
import { Card } from "primereact/card";
import { InputText } from "primereact/inputtext";
import { FC } from "react";
import { IProductCategory } from "../../types/product-category";
import { Button } from "primereact/button";
import { FiSave } from "react-icons/fi";
import { Action } from "../common/Buttons";

export type PCFormProps = {
  action: Action;
  productCategory?: IProductCategory;
};

const PCForm: FC<PCFormProps> = ({ action }) => {
  const { values, handleChange, handleSubmit, errors, touched } = useFormik({
    initialValues: { name: "" },
    onSubmit: () => {},
  });

  return (
    <section className="center-items">
      <Card
        title={action == "add" ? "New Category" : "Update Category"}
        className="col-md-5"
      >
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <div className="p-float-label">
              <InputText
                id="password"
                className={`${errors.name && "p-invalid"} w-100`}
                type="name"
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
          <Button className="btn w-100 center-items btn-outline-success">
            <FiSave />
            <span className="px-2"> Save</span>
          </Button>
        </form>
      </Card>
    </section>
  );
};

export default PCForm;
