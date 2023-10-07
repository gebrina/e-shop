import { useFormik } from "formik";
import { useMutation, useQuery } from "@tanstack/react-query";
import { GET_USER_KEY, UPDATE_USER_KEY } from "../../../constants";
import { getOneUser, updateUser } from "../../../api/user";
import { jwtDecode } from "../../../utils";
import ErrorPage from "../../../components/error";
import Loader from "../../../components/loader";
import { useEffect, useState } from "react";
import { IUser } from "../../../types/user";
import { Card } from "primereact/card";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { FiSave } from "react-icons/fi";
import { userValidation } from "../../../utils/validations";
import Notification, { NotificationType } from "../../common/Notification";
const UserProfile = () => {
  const user = jwtDecode()?.user;
  const [type, setType] = useState<NotificationType>();
  const { isLoading, error, data, refetch } = useQuery({
    queryKey: [GET_USER_KEY],
    queryFn: () => getOneUser(user?.id),
  });
  const { values, errors, touched, setFieldValue, handleSubmit, handleChange } =
    useFormik({
      initialValues: {
        username: "",
        password: "",
        email: "",
      },
      validationSchema: userValidation,
      onSubmit: () => handleUpdateUserProfile(),
    });

  const { mutate: handleUpdateUser } = useMutation({
    mutationKey: [UPDATE_USER_KEY],
    mutationFn: updateUser,
  });

  useEffect(() => {
    const user = data as IUser;
    if (user) {
      setFieldValue("email", user.email);
      setFieldValue("username", user.username);
    }
  }, [data, setFieldValue]);

  if (isLoading) return <Loader />;
  if (error) return <ErrorPage error={error?.message} />;

  const handleSuccess = () => {
    setType("success");
    refetch();
  };
  const handleEror = () => {
    setType("error");
  };
  const handleUpdateUserProfile = () => {
    const user = Object.assign({}, data, { ...values });
    handleUpdateUser(user, {
      onSuccess: handleSuccess,
      onError: handleEror,
    });
  };

  return (
    <section className="my-5 mx-auto">
      <Notification type={type} />
      <Card className="col-md-5 mx-auto" title="Update profile">
        <form onSubmit={handleSubmit}>
          <div className="mb-2">
            <div className="p-float-label">
              <InputText
                id="username"
                className={`${errors.username && "p-invalid"} w-100`}
                value={values.username}
                name="username"
                onChange={handleChange}
              />
              <label htmlFor="name">Username</label>
            </div>
            {errors.username && touched.username && (
              <small className="text-danger">{errors.username}</small>
            )}
          </div>

          <div className="my-4">
            <div className="p-float-label">
              <InputText
                id="email"
                className={`${errors.email && "p-invalid"} w-100`}
                value={values.email}
                name="email"
                onChange={handleChange}
              />
              <label htmlFor="name">Email</label>
            </div>
            {errors.email && touched.email && (
              <small className="text-danger">{errors.email}</small>
            )}
          </div>

          <div className="mb-2">
            <div className="p-float-label">
              <InputText
                id="username"
                type="password"
                className={`${errors.password && "p-invalid"} w-100`}
                value={values.password}
                name="password"
                onChange={handleChange}
              />
              <label htmlFor="name">Password</label>
            </div>
            {errors.password && touched.password && (
              <small className="text-danger">{errors.password}</small>
            )}
          </div>
          <Button className="btn center-items btn-outline-success w-100 mt-3">
            <FiSave /> &nbsp; Save
          </Button>
        </form>
      </Card>
    </section>
  );
};

export default UserProfile;
