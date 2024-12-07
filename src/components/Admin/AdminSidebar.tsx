import { TbCategoryPlus } from "react-icons/tb";
import { BiSolidCoupon, BiSolidCategoryAlt } from "react-icons/bi";
import {
  MdAddBox,
  MdBrandingWatermark,
  MdOutlineManageAccounts,
  MdOutlineProductionQuantityLimits,
} from "react-icons/md";
import { Link } from "react-router-dom";

const AdminSidebar = () => {
  return (
    <>
      <div className="bg-gray-50 antialiased dark:bg-gray-900">
        <nav className="fixed inset-x-0 top-0 z-50 border-b border-gray-200 bg-white px-4 py-2.5 dark:border-gray-700 dark:bg-gray-800">
          <div className="flex flex-wrap items-center justify-between">
            <div className="flex items-center justify-start">
              <Link to="/" className="mr-4 flex items-center justify-between">
                <img
                  src="../../../public/ecommerce.svg"
                  className="mr-3 h-8"
                  alt="Flowbite Logo"
                />
                <span className="self-center whitespace-nowrap text-2xl font-semibold dark:text-white">
                  Shopping World
                </span>
              </Link>
              <form action="#" method="GET" className="hidden md:block md:pl-2">
                <label htmlFor="topbar-search" className="sr-only">
                  Search
                </label>
                <div className="relative  md:w-96"></div>
              </form>
            </div>
            <div className="flex items-center lg:order-2">
              <Link
                to={"/admin"}
                className="mx-3 flex rounded-full bg-gray-800 text-sm focus:ring-4 focus:ring-gray-300 md:mr-0 dark:focus:ring-gray-600"
              >
                <img
                  className="size-8 rounded-full"
                  src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/michael-gough.png"
                  alt="user photo"
                />
              </Link>
            </div>
          </div>
        </nav>
        {/* Sidebar */}
        <aside
          className="fixed left-0 top-0 z-40 h-screen w-64 -translate-x-full border-r border-gray-200 bg-white pt-14 transition-transform md:translate-x-0 dark:border-gray-700 dark:bg-gray-800"
          aria-label="Sidenav"
          id="drawer-navigation"
        >
          <div className="h-full overflow-y-auto bg-white px-3 py-5 dark:bg-gray-800">
            <form action="#" method="GET" className="mb-2 md:hidden">
              <label htmlFor="sidebar-search" className="sr-only">
                Search
              </label>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <svg
                    className="size-5 text-gray-500 dark:text-gray-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                    />
                  </svg>
                </div>
                <input
                  type="text"
                  name="search"
                  id="sidebar-search"
                  className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2 pl-10 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
                  placeholder="Search"
                />
              </div>
            </form>
            <ul className="space-y-2">
              <li>
                <Link
                  to={"/admin"}
                  className="group flex items-center rounded-lg p-2 text-base font-medium text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                >
                  <MdOutlineProductionQuantityLimits />
                  <span className="ml-3">Manage Products</span>
                </Link>
              </li>
              <li>
                <Link
                  to={"/admin/orders"}
                  className="group flex w-full items-center rounded-lg p-2 text-base font-medium text-gray-900 transition duration-75 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                >
                  <MdOutlineManageAccounts />
                  <span className="ml-3 flex-1 whitespace-nowrap text-left">
                    Manage Orders
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  to={"/admin/addBrand"}
                  className="group flex w-full items-center rounded-lg p-2 text-base font-medium text-gray-900 transition duration-75 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                >
                  <MdBrandingWatermark />
                  <span className="ml-3 flex-1 whitespace-nowrap text-left">
                    Add Brand
                  </span>
                </Link>
              </li>

              <li>
                <Link
                  to={"/admin/addCategory"}
                  className="group flex w-full items-center rounded-lg p-2 text-base font-medium text-gray-900 transition duration-75 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                >
                  <TbCategoryPlus />
                  <span className="ml-3 flex-1 whitespace-nowrap text-left">
                    Add Category
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  to={"/admin/addSubCategory"}
                  className="group flex w-full items-center rounded-lg p-2 text-base font-medium text-gray-900 transition duration-75 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                >
                  <BiSolidCategoryAlt />
                  <span className="ml-3 flex-1 whitespace-nowrap text-left">
                    Add SubCategory
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  to={"/admin/addProduct"}
                  className="group flex w-full items-center rounded-lg p-2 text-base font-medium text-gray-900 transition duration-75 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                >
                  <MdAddBox />
                  <span className="ml-3 flex-1 whitespace-nowrap text-left">
                    Add Product
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  to={"/admin/coupon"}
                  className="group flex w-full items-center rounded-lg p-2 text-base font-medium text-gray-900 transition duration-75 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                >
                  <BiSolidCoupon />

                  <span className="ml-3 flex-1 whitespace-nowrap text-left">
                    Add Coupon
                  </span>
                </Link>
              </li>
            </ul>
          </div>
        </aside>
      </div>
    </>
  );
};

export default AdminSidebar;
