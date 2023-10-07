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

export const productCategoryValidation = yup.object({
  name: yup.string().required("Product category is required"),
  description: yup.string().required("Description is required."),
});

export const productValidation = yup.object({
  name: yup.string().required("Product name is required."),
  price: yup
    .number()
    .required("Product price is required.")
    .min(1, "Product price must be greater than 0"),
  description: yup.string().required("Description is required."),
  quantity: yup
    .number()
    .required("Quantity is required.")
    .min(1, "Product price must be greater than 0"),
  category: yup.string().required("Product category is required."),
});

export const userValidation = yup.object({
  username: yup.string().required("Username is required."),
  email: yup.string().email("Enter valid email").required("Email is required."),
});
