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
