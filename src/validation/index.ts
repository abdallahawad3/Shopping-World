import * as yup from "yup";

export const ADD_CATEGORY_SCHEMA = yup
  .object({
    categoryName: yup.string().required("The category name is required"),
    categoryImage: yup
      .mixed<FileList>()
      .required("A file is required")
      .test("fileList", "Please select at least one image.", (value) => {
        const files = value as FileList;
        return value && files.length > 0;
      })
      .test("fileType", "Unsupported file format", (value) => {
        const files = value as FileList;
        return (
          files &&
          files[0] &&
          ["image/jpeg", "image/png", "image/gif"].includes(files[0].type)
        );
      }),
  })
  .required();
const emailRegex =
  /^[\w-]+(\.[\w-]+)*@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*(\.[a-zA-Z]{2,})$/;
const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

export const REGISTER_SCHEMA = yup
  .object({
    passwordConfirm: yup
      .string()
      .oneOf([yup.ref("password")], "Passwords must match")
      .required("Please confirm your password"),
    name: yup
      .string()
      .required("This filed is required")
      .min(4, "Minimum character count is 4"),
    email: yup
      .string()
      .required("This This filed is required")
      .matches(emailRegex, "Enter a valid email address"),
    password: yup
      .string()
      .required("This This filed is required")
      .matches(
        passwordRegex,
        "Password must be 8+ characters, with uppercase, lowercase, number, and special character",
      ),
  })
  .required();

export const LOGIN_SCHEMA = yup
  .object({
    email: yup
      .string()
      .required("This This filed is required")
      .matches(emailRegex, "Enter a valid email address"),
    password: yup
      .string()
      .required("This This filed is required")
      .matches(
        passwordRegex,
        "Password must be 8+ characters, with uppercase, lowercase, number, and special character",
      ),
  })
  .required();
