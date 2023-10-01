import * as yup from "yup";

export const loginValidtion = yup.object({
  email: yup
    .string()
    .email("Enter valid email.")
    .required("Email is required."),
  password: yup.string().required("Password is required."),
});

export const registerValidation = yup.object({
  username: yup.string().required("Username is required."),
  email: yup
    .string()
    .email("Invalid email address")
    .required("Email is required."),
  password: yup
    .string()
    .min(3, "Password must be greater than 3 characters.")
    .required("Password is required."),
});
