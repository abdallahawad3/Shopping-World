import { useState } from "react";
// import { MdDelete } from "react-icons/md";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { ADD_CATEGORY_SCHEMA } from "../../validation";
import { useAppDispatch } from "../../app/store";
import { AddCategory } from "../../app/feature/CategorySlice/CategorySlice";
import uploadImg from "../../../public/upload.png";
type AddCategoryInputs = {
  categoryName: string;
  categoryImage: FileList;
};

const AddCategoryPage = () => {
  const [selectedImage, setSelectedImage] = useState<string>(uploadImg);
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedImage(URL.createObjectURL(e.target.files[0]));
    }
  };

  const dispatch = useAppDispatch();
  // Handle Submit Category
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AddCategoryInputs>({
    resolver: yupResolver(ADD_CATEGORY_SCHEMA),
  });
  const onSubmit: SubmitHandler<AddCategoryInputs> = (data) => {
    const formData = new FormData();
    formData.append("image", data.categoryImage[0]);
    formData.append("name", data.categoryName);
    dispatch(AddCategory(formData));
  };

  return (
    <div className="mx-auto mt-10 max-w-screen-xl space-y-5 px-4 py-10 md:ms-[16rem] lg:px-12">
      <h2 className="mb-5 text-xl font-semibold text-gray-900 sm:text-2xl dark:text-white">
        Add New Category
      </h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {/* Add Images */}
        <div>
          <p className="mb-2 text-lg font-semibold text-gray-900  dark:text-white">
            Upload An Image
          </p>
          <div className="flex w-full">
            <label
              htmlFor="dropzone-file"
              className="relative flex size-64 cursor-pointer items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:border-gray-500 dark:hover:bg-gray-600 "
            >
              <div className=" flex  items-center justify-center pb-6 pt-5">
                <img
                  src={selectedImage}
                  className="size-full"
                  alt="Upload Image"
                />
              </div>
              <input
                id="dropzone-file"
                type="file"
                className="hidden"
                multiple
                {...register("categoryImage", {
                  onChange: handleImageChange,
                })}
              />
            </label>
          </div>
          <p className="text-red-600">{errors.categoryImage?.message}</p>
        </div>
        {/* Add Images */}
        <div className="mb-6">
          <label
            htmlFor="large-input"
            className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
          >
            Category Name
          </label>
          <input
            {...register("categoryName")}
            type="text"
            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
            placeholder="Category Name"
          />
          <p className="text-red-600">{errors.categoryName?.message}</p>
        </div>
        <div className="flex justify-end">
          <button
            type="submit"
            className="mb-2 me-2 rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Add Category
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddCategoryPage;
