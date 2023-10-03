import { useFormik } from "formik";
import { InputText } from "primereact/inputtext";
import { FC } from "react";

export type PCFormProps = {
  action: "update" | "new";
};

const PCForm: FC<PCFormProps> = () => {
  const { values, handleChange, handleSubmit, errors, touched } = useFormik({
    initialValues: { name: "" },
    onSubmit: () => {},
  });

  return (
    <form className="card" onSubmit={handleSubmit}>
      <div className="my-4">
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
  );
};

export default PCForm;
