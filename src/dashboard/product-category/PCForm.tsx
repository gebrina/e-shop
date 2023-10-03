import { useFormik } from "formik";
import { Card } from "primereact/card";
import { InputText } from "primereact/inputtext";
import { FC } from "react";

export type PCFormProps = {
  action: "update" | "new" | undefined;
};

const PCForm: FC<PCFormProps> = ({ action }) => {
  const { values, handleChange, handleSubmit, errors, touched } = useFormik({
    initialValues: { name: "" },
    onSubmit: () => {},
  });

  return (
    <section className="center-items">
      <Card
        title={action == "new" ? "Create Category" : "Update Category"}
        className="col-md-5"
      >
        <form onSubmit={handleSubmit}>
          <div>
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
        </form>
      </Card>
    </section>
  );
};

export default PCForm;
