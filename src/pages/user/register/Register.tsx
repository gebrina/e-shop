import { useRef } from "react";
import { Toast } from "primereact/toast";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { InputText } from "primereact/inputtext";
import { useFormik } from "formik";
import { NavLink, useNavigate } from "react-router-dom";
import { registerValidation } from "../../../utils/validations";
import { useMutation } from "@tanstack/react-query";
import { createUser } from "../../../api/user";

const Login = () => {
  const toastRef = useRef<Toast>(null);
  const navigate = useNavigate();
  const { mutate, isLoading } = useMutation({
    mutationKey: ["new-user"],
    mutationFn: createUser,
    onError: () => handleError(),
  });

  const { handleSubmit, values, handleChange, errors, touched } = useFormik({
    initialValues: { username: "", email: "", password: "" },
    validationSchema: registerValidation,
    onSubmit: () => handleRegistration(),
  });

  const handleError = () => {
    toastRef.current?.show({
      severity: "error",
      summary: "Registration",
      detail: "Something went wrong try again..",
    });
  };
  const handleSuccess = () => {
    toastRef.current?.show({
      severity: "success",
      summary: "Registration",
      detail: "You have registered succssfully!",
      life: 3000,
    });
    setTimeout(() => {
      navigate("/user/login");
    }, 3000);
  };

  const handleRegistration = () => {
    mutate({ ...values }, { onSuccess: handleSuccess });
  };

  return (
    <main className="container d-flex  justify-content-center align-items-center">
      <Toast ref={toastRef} />
      <section className="col-md-5 col-sm-12">
        <Card title="Register" className="text-center bg-light">
          <form onSubmit={handleSubmit} style={{ textAlign: "left" }}>
            <div className="">
              <div className="p-float-label">
                <InputText
                  autoComplete="off"
                  id="username"
                  className={`${errors.username && "p-invalid"} w-100`}
                  value={values.username}
                  name="username"
                  onChange={handleChange}
                />
                <label htmlFor="username">Username </label>
              </div>
              {errors.username && touched.username && (
                <small className="text-danger">{errors.username}</small>
              )}
            </div>

            <div className="my-4">
              <div className="p-float-label">
                <InputText
                  id="email"
                  autoComplete="false"
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
              {isLoading ? "Registering..." : "Register"}
            </Button>

            <p className="text-center">
              Already have account &nbsp;
              <NavLink className={"text-danger"} to={"/user/login"}>
                login
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
