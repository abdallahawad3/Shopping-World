import { Link } from "react-router-dom";
import {
  useDeleteProductMutation,
  useGetDashboardProductsQuery,
  useUpdateProductMutation,
} from "../../app/services/dashboardProductApi";
import { textSlice } from "../../utils";
import Pagination from "../utils/Pagination";
import { useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import ModalDialog from "../utils/ModalDialog";
import toast from "react-hot-toast";
import { AddProductInputs } from "../../data";
import type { IAddProduct } from "../../interfaces";
import { useAppDispatch, type RootState } from "../../app/store";
import { getSingleProduct } from "../../app/feature/ProductsSlice/productsSlice";
import { useSelector } from "react-redux";
import uploadImg from "../../../public/upload.png";

const inputsDefaultValues = {
  description: "",
  price: 0,
  quantity: 0,
  subcategory: "",
  title: "",
};
const DashboardTable = () => {
  //**  States...✅✅✅
  const [page, setPage] = useState(1);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [productClick, setProductClick] = useState("");
  const { singleProduct, isLoading: LoadingSingleProduct } = useSelector(
    (state: RootState) => state.allProducts,
  );

  const [imagesUrls, setImagesUrls] = useState<string[]>([]);
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [imageCover, setImageCover] = useState<string>(uploadImg);
  const dispatch = useAppDispatch();
  const { isLoading, data } = useGetDashboardProductsQuery({
    limit: 6,
    page: page,
  });
  const [deleteProduct, { isLoading: deleteLoading }] =
    useDeleteProductMutation();
  const [inputsValue, setInputsValue] =
    useState<IAddProduct>(inputsDefaultValues);
  const [updateProduct] = useUpdateProductMutation();
  //** EFFECTS..
  useEffect(() => {
    if (!LoadingSingleProduct && singleProduct) {
      setInputsValue({
        description: singleProduct.description || "",
        price: singleProduct.price || 0,
        quantity: singleProduct.quantity || 0,
        title: singleProduct.title || "",
        subcategory: "",
      });

      setImageCover(
        singleProduct.images[0].search("https") == -1
          ? singleProduct.images[0]
          : singleProduct.images[0].slice(
              singleProduct.images[0].search("https"),
            ),
      );
      (async () => {
        if (singleProduct.images.length != 0) {
          const fileArray = await Promise.all(
            singleProduct.images.map(async (url, index) => {
              const response = await fetch(url);
              const blob = await response.blob();
              const file = new File([blob], `image${index + 1}.jpg`, {
                type: blob.type,
              });
              return file;
            }),
          );
          setImageFiles(fileArray);
        }
      })();
    }
  }, [LoadingSingleProduct, singleProduct]);

  useEffect(() => {
    // Show success toast after delete
    if (deleteLoading) {
      const deleteTimeout = setTimeout(() => {
        toast.success("The product has been deleted!", {
          position: "top-right",
        });
      }, 2000);

      return () => clearTimeout(deleteTimeout); // Clean up timeout if component unmounts
    }

    // Fetch single product details
    if (productClick.length !== 0) {
      dispatch(getSingleProduct(productClick));
    }
  }, [deleteLoading, productClick, dispatch]);

  //! Handlers

  const onClick = (page: number) => {
    setPage(page);
  };

  const handleClickProduct = (id: string) => {
    setProductClick(id);
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
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setInputsValue((prev) => ({ ...prev, [name]: value }));
  };
  // OnSubmit Form..✅
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const values = Object.values(inputsValue);
    const isEmpty = values
      .slice(0, 2)
      .some((ele) => ele.toString().length === 0);
    if (isEmpty) {
      toast.success("Please complete data.", {
        position: "top-right",
        icon: "⚠️",
      });
    }
    if (!isEmpty) {
      const formData = new FormData();
      formData.append("description", inputsValue.description);
      formData.append("price", inputsValue.price.toFixed());
      formData.append("quantity", inputsValue.quantity.toFixed());
      formData.append("title", inputsValue.title);
      formData.append("imageCover", imageFiles[0]);
      imageFiles.map((image) => formData.append("images", image));
      updateProduct({ data: formData, id: productClick });
    }
  };

  // Renders
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
          className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:bg-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
          id={ele.id}
          name={ele.name}
          type={ele.type}
          value={inputsValue[ele.name]}
          onChange={handleChange}
        />
      </div>
    );
  });

  if (isLoading) return <h1>LOADING...👋👋</h1>;

  return (
    <section className="mt-7 bg-gray-50 p-3 sm:p-5 md:ms-[16rem] dark:bg-gray-900">
      <div className="mx-auto max-w-screen-xl px-4 lg:px-12">
        {/* Start coding here */}
        <div className="relative overflow-hidden bg-white shadow-md  dark:bg-gray-800">
          <div className="flex flex-col items-center justify-between space-y-3 p-4 md:flex-row md:space-x-4 md:space-y-0">
            <div className="w-full md:w-1/2">
              <form className="flex items-center">
                <label htmlFor="simple-search" className="sr-only">
                  Search
                </label>
                <div className="relative w-full">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <svg
                      aria-hidden="true"
                      className="size-5 text-gray-500 dark:text-gray-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <input
                    type="text"
                    id="simple-search"
                    className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2 pl-10 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
                    placeholder="Search"
                    required
                  />
                </div>
              </form>
            </div>
            <div className="flex w-full shrink-0 flex-col items-stretch justify-end space-y-2 md:w-auto md:flex-row md:items-center md:space-x-3 md:space-y-0">
              <Link
                to={"/admin/addProduct"}
                type="button"
                className="flex items-center justify-center rounded-lg bg-primary-700 px-4 py-2 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                <svg
                  className="mr-2 size-3.5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path
                    clipRule="evenodd"
                    fillRule="evenodd"
                    d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                  />
                </svg>
                Add product
              </Link>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-gray-500 dark:text-gray-400">
              <thead className="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-4 py-3">
                    Product Image
                  </th>
                  <th scope="col" className="px-4 py-3">
                    Product name
                  </th>
                  <th scope="col" className="px-4 py-3">
                    Category Id
                  </th>
                  <th scope="col" className="px-4 py-3">
                    Sold
                  </th>
                  <th scope="col" className="px-4 py-3">
                    Description
                  </th>
                  <th scope="col" className="px-4 py-3">
                    Price
                  </th>
                  <th scope="col" className="px-4 py-3 text-center">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {data?.data &&
                  data?.data.map((ele) => (
                    <tr key={ele._id} className="border-b dark:border-gray-700">
                      <td className="whitespace-nowrap px-4 py-3 ">
                        <img
                          src={
                            ele.imageCover.search("https") != -1
                              ? ele.imageCover.slice(
                                  ele.imageCover.search("https"),
                                )
                              : ele.imageCover
                          }
                          alt=""
                          className="size-12 rounded-full bg-contain"
                        />
                      </td>
                      <td className="px-4 py-3"> {textSlice(ele.title, 8)}</td>
                      <td className="px-4 py-3">{ele.category}</td>
                      <td className="px-4 py-3">{ele.sold}</td>
                      <td className="px-4 py-3">
                        {textSlice(ele.description, 10)}
                      </td>
                      <td className="px-4 py-3">${ele.price}</td>
                      <td className="flex items-center justify-end gap-2 px-4 py-3">
                        <button
                          onClick={() => {
                            handleClickProduct(ele._id);
                            setOpenEditModal(true);
                          }}
                          id="apple-imac-27-dropdown-button"
                          data-dropdown-toggle="apple-imac-27-dropdown"
                          className="flex items-center justify-center rounded-lg bg-green-700 px-4 py-2 text-sm font-medium text-white hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                          type="button"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => {
                            setOpenDeleteModal(true);
                            handleClickProduct(ele._id);
                          }}
                          id="apple-imac-27-dropdown-button"
                          data-dropdown-toggle="apple-imac-27-dropdown"
                          className="flex items-center justify-center rounded-lg bg-red-700 px-4 py-2 text-sm font-medium text-white hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
                          type="button"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
          <nav
            className="flex flex-col items-start justify-between space-y-3 p-4 md:flex-row md:items-center md:space-y-0"
            aria-label="Table navigation"
          ></nav>
          <div className="mb-6 text-center">
            {data?.paginationResult.numberOfPages && (
              <Pagination
                numsOfPages={data?.paginationResult.numberOfPages}
                onClickPage={onClick}
              />
            )}
          </div>
        </div>
      </div>
      {/* Delete Modal */}
      <ModalDialog
        description="Are you sure you want to delete product? The product will be permanently removed. This action cannot be undone."
        title="Delete Product"
        open={openDeleteModal}
        setOpen={setOpenDeleteModal}
      >
        <div className="bg-white px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6 dark:bg-gray-800 dark:text-white">
          <button
            type="button"
            onClick={() => {
              deleteProduct(productClick);
              setOpenDeleteModal(false);
              setProductClick("");
            }}
            className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
          >
            Delete
          </button>
          <button
            type="button"
            data-autofocus
            onClick={() => {
              if (productClick.length != 0) {
                dispatch(getSingleProduct(productClick));
              }
              setOpenDeleteModal(false);
            }}
            className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
          >
            Cancel
          </button>
        </div>
      </ModalDialog>

      {/* Edit Modal */}
      <ModalDialog
        title="Edit Product"
        open={openEditModal}
        setOpen={setOpenEditModal}
      >
        <form
          onSubmit={onSubmit}
          className="p-5 dark:bg-gray-800 dark:text-white"
        >
          <div>
            <p className="mb-2  text-gray-900  dark:text-white">
              Upload An Image
            </p>
            <div className=" space-y-2 border-2  border-dotted p-2">
              <div className="flex w-full flex-wrap gap-2 rounded-md">
                <label
                  htmlFor="dropzone-file"
                  className="relative flex size-24 cursor-pointer items-center justify-center gap-2 rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:border-gray-500 dark:hover:bg-gray-600 "
                >
                  <div className=" flex items-center justify-center pb-6 pt-5">
                    <img src={imageCover} className="" alt="Upload Image" />
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
                      <img src={img} className="" alt="Upload Image" />
                    </div>
                  ))}
              </div>
            </div>
          </div>
          {RenderInputs}
          <div className="bg-white px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6 dark:bg-gray-800 dark:text-white">
            <button
              type="submit"
              className="inline-flex w-full justify-center rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 sm:ml-3 sm:w-auto"
            >
              Update
            </button>
            <button
              type="button"
              data-autofocus
              onClick={() => {
                setOpenEditModal(false);
                setInputsValue(inputsDefaultValues);
                setImageFiles([]);
                setImageCover(uploadImg);
                setProductClick("");
              }}
              className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
            >
              Cancel
            </button>
          </div>
        </form>
      </ModalDialog>
    </section>
  );
};

export default DashboardTable;
