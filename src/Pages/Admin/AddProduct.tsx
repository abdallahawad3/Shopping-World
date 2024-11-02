import type { ChangeEvent, FormEvent } from "react";
import uploadImg from "../../../public/upload.png";
import { useState, useEffect } from "react";
import SelectMenu from "../../components/utils/SelectMenu";
import { useSelector } from "react-redux";
import { useAppDispatch, type RootState } from "../../app/store";
import { getAllCategory } from "../../app/feature/CategorySlice/CategorySlice";
import { getAllBrand } from "../../app/feature/Brands/brandSlice";
import { AddProductInputs } from "../../data";
import type { IAddProduct } from "../../interfaces";
import { useAddNewProductMutation } from "../../app/services/dashboardProductApi";
import toast from "react-hot-toast";
const defaultObj = {
  _id: "",
  slug: "",
  image: "",
  name: "",
};

const inputsDefaultValues = {
  description: "",
  price: 0,
  quantity: 0,
  subcategory: "",
  title: "",
};

const AddProductPage = () => {
  // Call Data [API.😇]
  const { data: categoryData } = useSelector(
    (state: RootState) => state.allCategory,
  );
  const { data: brandData } = useSelector((state: RootState) => state.allBrand);
  const dispatch = useAppDispatch();

  // States..👋
  const [selectedCategory, setSelectedCategory] = useState(defaultObj);
  const [selectedBrand, setSelectedBrand] = useState(defaultObj);
  const [imagesUrls, setImagesUrls] = useState<string[]>([]);
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [inputsValue, setInputsValue] =
    useState<IAddProduct>(inputsDefaultValues);
  const [imageCover, setImageCover] = useState<string>(uploadImg);
  const [addProduct] = useAddNewProductMutation();
  //* Effects..🤩

  useEffect(() => {
    dispatch(getAllCategory(60));
    dispatch(getAllBrand(20));
    setSelectedCategory(selectedCategory);
    setSelectedBrand(selectedBrand);
  }, [dispatch, selectedCategory, selectedBrand]);

  // Handlers....✅✅🔥
  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputsValue({ ...inputsValue, [name]: value });
  };
  function onImageChange(e: ChangeEvent<HTMLInputElement>) {
    const files = e.target.files ? Array.from(e.target.files) : [];
    if (files.length > 0) {
      setImageCover(URL.createObjectURL(files[0]));
      const newImages = files.map((file) => URL.createObjectURL(file));
      setImagesUrls((prev) => [...prev, ...newImages]);
      setImageFiles((prev) => [...prev, ...files]);
    }
  }

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("category", selectedCategory._id);
    formData.append("brand", selectedBrand._id);
    formData.append("title", inputsValue.title);
    formData.append("price", `${inputsValue.price}`);
    formData.append("description", inputsValue.description);
    formData.append("quantity", `${inputsValue.quantity}`);
    formData.append("imageCover", imageFiles[imageFiles.length - 1]);
    imageFiles.map((image) => formData.append("images", image));
    if (
      selectedCategory._id.length == 0 ||
      selectedBrand._id.length == 0 ||
      inputsValue.title.length == 0 ||
      inputsValue.description.length == 0 ||
      inputsValue.quantity == 0 ||
      inputsValue.price == 0 ||
      imageFiles.length == 0
    ) {
      toast.success("Please complete data.", {
        position: "top-right",
        icon: "⚠️",
      });
    }
    if (
      selectedCategory._id.length != 0 &&
      selectedBrand._id.length != 0 &&
      inputsValue.title.length != 0 &&
      inputsValue.description.length != 0 &&
      inputsValue.quantity != 0 &&
      inputsValue.price != 0 &&
      imageFiles.length != 0
    ) {
      addProduct(formData);
      toast.success("The product add Successfully", {
        position: "top-right",
      });
      setInputsValue(inputsDefaultValues);
      setSelectedCategory(defaultObj);
      setSelectedBrand(defaultObj);
      setImagesUrls([]);
      setImageFiles([]);
      setImageCover(uploadImg);
    }
  };

  //! Renders....🔃🔃

  const RenderInputs = AddProductInputs.map((ele) => {
    return (
      <div key={ele.id} className="mb-6">
        <label
          htmlFor={ele.id}
          className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
        >
          {ele.label}
        </label>
        <input
          className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
          id={ele.id}
          name={ele.name}
          type={ele.type}
          value={inputsValue[ele.name]}
          onChange={handleOnChange}
        />
      </div>
    );
  });

  return (
    <div className="mx-auto mt-10 max-w-screen-xl space-y-5 px-4 py-10 md:ms-[16rem] lg:px-12">
      <h2 className="mb-5 text-xl font-semibold text-gray-900 sm:text-2xl dark:text-white">
        Add New Product
      </h2>
      <form onSubmit={onSubmit} className="space-y-5">
        <div>
          <p className="mb-2 text-lg font-semibold text-gray-900  dark:text-white">
            Upload An Image
          </p>
          <div className=" space-y-2 border-2  border-dotted p-2">
            <div className="flex w-full flex-wrap gap-2 rounded-md">
              <label
                htmlFor="dropzone-file"
                className="relative flex size-64 cursor-pointer items-center justify-center gap-2 rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:border-gray-500 dark:hover:bg-gray-600 "
              >
                <div className=" flex  items-center justify-center pb-6 pt-5">
                  <img
                    src={imageCover}
                    className="size-full"
                    alt="Upload Image"
                  />
                </div>
                <input
                  onChange={onImageChange}
                  id="dropzone-file"
                  type="file"
                  multiple
                  className="hidden"
                />
              </label>
            </div>
            <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {imagesUrls &&
                imagesUrls.map((img, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-center overflow-hidden rounded-md border "
                  >
                    <img src={img} className="size-64" alt="Upload Image" />
                  </div>
                ))}
            </div>
          </div>
        </div>
        {RenderInputs}
        {selectedCategory && (
          <SelectMenu
            category={categoryData}
            selected={selectedCategory && selectedCategory}
            setSelected={setSelectedCategory}
            selectFor="Category"
          />
        )}
        {selectedBrand && (
          <SelectMenu
            category={brandData}
            selected={selectedBrand}
            setSelected={setSelectedBrand}
            selectFor="Brands"
          />
        )}

        <div className="flex justify-end">
          <button
            type="submit"
            className="mb-2 me-2 rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Add Product
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProductPage;
