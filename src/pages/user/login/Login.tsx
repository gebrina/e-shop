import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { InputText } from "primereact/inputtext";
import { useFormik } from "formik";
import { NavLink } from "react-router-dom";
import { loginValidtion } from "../../../utils/validations";

const Login = () => {
  const { handleSubmit, values, handleChange, errors, touched } = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema: loginValidtion,
    onSubmit: () => {},
  });

  return (
    <main className="container d-flex  justify-content-center align-items-center">
      <section className="col-md-5 col-sm-12">
        <Card title="Login" className="text-center bg-light">
          <form onSubmit={handleSubmit} style={{ textAlign: "left" }}>
            <div>
              <div className="p-float-label">
                <InputText
                  id="email"
                  className={`${errors.email && "p-invalid"} w-100`}
                  value={values.email}
                  name="email"
                  onChange={handleChange}
                />
                <label htmlFor="email">Email Address</label>
              </div>
              {errors.email && touched.email && (
                <small className="text-danger">{errors.email}</small>
              )}
            </div>
            <div className="my-4">
              <div className="p-float-label">
                <InputText
                  id="password"
                  className={`${errors.password && "p-invalid"} w-100`}
                  type="password"
                  value={values.password}
                  name="password"
                  onChange={handleChange}
                />
                <label htmlFor="password">Password</label>
              </div>
              {errors.password && touched.password && (
                <small className="text-danger">{errors.password}</small>
              )}
            </div>
            <Button className="btn btn-outline-success w-50 sm:w-100 my-4 mx-auto d-block">
              Login
            </Button>
            <p className="text-center">
              Don't have account &nbsp;
              <NavLink className={"text-danger"} to={"/user/register"}>
                register
              </NavLink>
              !
            </p>
          </form>
        </Card>
      </section>
    </main>
  );
};

export default Login;
