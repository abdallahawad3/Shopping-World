import { useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import uploadImg from "../../../public/upload.png";
import toast from "react-hot-toast";
import { addBrand } from "../../app/feature/Brands/brandSlice";
import { useAppDispatch, type RootState } from "../../app/store";
import { useSelector } from "react-redux";

const AddBrand = () => {
  const [brandName, setBrandName] = useState("");
  const [selectedImg, setSelectedImg] = useState(uploadImg);
  const [selectedFile, setSelectedFile] = useState<FileList | null>(null);
  const dispatch = useAppDispatch();
  const { isLoading } = useSelector((state: RootState) => state.allBrand);
  // Change Image Logic
  const onImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedImg(URL.createObjectURL(e.target.files[0]));
      setSelectedFile(e.target.files);
    }
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData();
    if (selectedFile) {
      formData.append("image", selectedFile[0]);
    }
    formData.append("name", brandName);

    if (brandName.length === 0 || !selectedFile) {
      let errorMessage = "";

      if (brandName.length === 0) {
        errorMessage += "Category Name is required. ";
      }
      if (!selectedFile) {
        errorMessage += "Must select an image.";
      }

      toast.error(errorMessage.trim());
    }

    if (brandName.length > 0 && selectedFile != null) {
      dispatch(addBrand(formData));
    }
  };

  useEffect(() => {
    if (!isLoading) {
      setSelectedImg(uploadImg);
      setBrandName("");
      setSelectedFile(null);
    }
  }, [isLoading]);

  return (
    <div className="mx-auto mt-10 max-w-screen-xl space-y-5 px-4 py-10 md:ms-[16rem] lg:px-12">
      <h2 className="mb-5 text-xl font-semibold text-gray-900 sm:text-2xl dark:text-white">
        Add New Brand
      </h2>
      <form onSubmit={onSubmit} className="space-y-5">
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
                  src={selectedImg}
                  className="size-full"
                  alt="Upload Image"
                />
              </div>
              <input
                onChange={onImageChange}
                id="dropzone-file"
                type="file"
                className="hidden"
              />
            </label>
          </div>
        </div>
        <div className="mb-6">
          <label
            htmlFor="large-input"
            className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
          >
            Brand Name
          </label>
          <input
            type="text"
            value={brandName}
            onChange={(e) => {
              setBrandName(e.target.value);
            }}
            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
          />
        </div>
        <div className="flex justify-end">
          <button
            type="submit"
            className="mb-2 me-2 rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Add Brand
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddBrand;
