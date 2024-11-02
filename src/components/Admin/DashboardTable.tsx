import { Link } from "react-router-dom";
import { useGetDashboardProductsQuery } from "../../app/services/dashboardProductApi";
import { textSlice } from "../../utils";
import Pagination from "../utils/Pagination";
import { useState } from "react";
const DashboardTable = () => {
  const [page, setPage] = useState(1);
  const { isLoading, data } = useGetDashboardProductsQuery({
    limit: 6,
    page: page,
  });

  //! Handlers
  const onClick = (page: number) => {
    setPage(page);
  };

  const handleClickProduct = (id: string) => {
    console.log(id);
  };

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
    </section>
  );
};

export default DashboardTable;
