import * as yup from "yup";

export const loginValidtion = yup.object({
  email: yup.string().email("Enter valid email").required("Email is required"),
  password: yup.string().required("Password is required"),
});
