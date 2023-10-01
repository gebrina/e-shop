import { InputText } from "primereact/inputtext";
import { useFormik } from "formik";

const Login = () => {
  const { handleSubmit, values, handleChange, errors, touched } = useFormik({
    initialValues: { email: "", paswword: "" },
    onSubmit: () => {},
  });

  return (
    <main className="container d-flex  justify-content-center align-items-center">
      <section className="col-md-6 ">
        <form>
          <span className="p-float-label">
            <InputText
              id="email"
              value={values.email}
              name="email"
              onChange={handleChange}
            />
            <label htmlFor="email">Email Address</label>
          </span>
        </form>
      </section>
    </main>
  );
};

export default Login;
