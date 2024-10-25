import { MdAddBox } from "react-icons/md";
import { Link } from "react-router-dom";

const AdminSidebar = () => {
  return (
    <>
      <div className="bg-gray-50 antialiased dark:bg-gray-900">
        <nav className="fixed inset-x-0 top-0 z-50 border-b border-gray-200 bg-white px-4 py-2.5 dark:border-gray-700 dark:bg-gray-800">
          <div className="flex flex-wrap items-center justify-between">
            <div className="flex items-center justify-start">
              <a
                href="https://flowbite.com"
                className="mr-4 flex items-center justify-between"
              >
                <img
                  src="./ecommerce.svg"
                  className="mr-3 h-8"
                  alt="Flowbite Logo"
                />
                <span className="self-center whitespace-nowrap text-2xl font-semibold dark:text-white">
                  Shopping World
                </span>
              </a>
              <form action="#" method="GET" className="hidden md:block md:pl-2">
                <label htmlFor="topbar-search" className="sr-only">
                  Search
                </label>
                <div className="relative  md:w-96"></div>
              </form>
            </div>
            <div className="flex items-center lg:order-2">
              <button
                className="mx-3 flex rounded-full bg-gray-800 text-sm focus:ring-4 focus:ring-gray-300 md:mr-0 dark:focus:ring-gray-600"
                id="user-menu-button"
                aria-expanded="false"
                data-dropdown-toggle="dropdown"
              >
                <img
                  className="size-8 rounded-full"
                  src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/michael-gough.png"
                  alt="user photo"
                />
              </button>
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
                  <svg
                    aria-hidden="true"
                    className="size-6 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z" />
                    <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z" />
                  </svg>
                  <span className="ml-3">Manage Products</span>
                </Link>
              </li>
              <li>
                <Link
                  to={"/admin/orders"}
                  className="group flex w-full items-center rounded-lg p-2 text-base font-medium text-gray-900 transition duration-75 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                  aria-controls="dropdown-pages"
                  data-collapse-toggle="dropdown-pages"
                >
                  <svg
                    aria-hidden="true"
                    className="size-6 shrink-0 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="ml-3 flex-1 whitespace-nowrap text-left">
                    Manage Orders
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  to={"/admin/addBrand"}
                  className="group flex w-full items-center rounded-lg p-2 text-base font-medium text-gray-900 transition duration-75 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                  aria-controls="dropdown-sales"
                  data-collapse-toggle="dropdown-sales"
                >
                  <svg
                    aria-hidden="true"
                    className="size-6 shrink-0 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 2a4 4 0 00-4 4v1H5a1 1 0 00-.994.89l-1 9A1 1 0 004 18h12a1 1 0 00.994-1.11l-1-9A1 1 0 0015 7h-1V6a4 4 0 00-4-4zm2 5V6a2 2 0 10-4 0v1h4zm-6 3a1 1 0 112 0 1 1 0 01-2 0zm7-1a1 1 0 100 2 1 1 0 000-2z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="ml-3 flex-1 whitespace-nowrap text-left">
                    Add Brand
                  </span>
                </Link>
              </li>

              <li>
                <Link
                  to={"/admin/addCategory"}
                  className="group flex w-full items-center rounded-lg p-2 text-base font-medium text-gray-900 transition duration-75 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                  aria-controls="dropdown-authentication"
                  data-collapse-toggle="dropdown-authentication"
                >
                  <svg
                    aria-hidden="true"
                    className="size-6 shrink-0 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="ml-3 flex-1 whitespace-nowrap text-left">
                    Add Category
                  </span>
                </Link>
                <ul
                  id="dropdown-authentication"
                  className="hidden space-y-2 py-2"
                ></ul>
              </li>
              <li>
                <Link
                  to={"/admin/addSubCategory"}
                  className="group flex w-full items-center rounded-lg p-2 text-base font-medium text-gray-900 transition duration-75 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                  aria-controls="dropdown-authentication"
                  data-collapse-toggle="dropdown-authentication"
                >
                  <svg
                    aria-hidden="true"
                    className="size-6 shrink-0 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  <span className="ml-3 flex-1 whitespace-nowrap text-left">
                    Add SubCategory
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  to={"/admin/addProduct"}
                  className="group flex w-full items-center rounded-lg p-2 text-base font-medium text-gray-900 transition duration-75 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                  aria-controls="dropdown-authentication"
                  data-collapse-toggle="dropdown-authentication"
                >
                  <MdAddBox />
                  <span className="ml-3 flex-1 whitespace-nowrap text-left">
                    Add Product
                  </span>
                </Link>
              </li>
            </ul>
          </div>
        </aside>
        {/* <main className="h-auto p-4 pt-20 md:ml-64">
          <div className="mb-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="h-32 rounded-lg border-2 border-dashed border-gray-300 md:h-64 dark:border-gray-600" />
            <div className="h-32 rounded-lg border-2 border-dashed border-gray-300 md:h-64 dark:border-gray-600" />
            <div className="h-32 rounded-lg border-2 border-dashed border-gray-300 md:h-64 dark:border-gray-600" />
            <div className="h-32 rounded-lg border-2 border-dashed border-gray-300 md:h-64 dark:border-gray-600" />
          </div>
          <div className="mb-4 h-96 rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-600" />
          <div className="mb-4 grid grid-cols-2 gap-4">
            <div className="h-48 rounded-lg border-2 border-dashed border-gray-300 md:h-72 dark:border-gray-600" />
            <div className="h-48 rounded-lg border-2 border-dashed border-gray-300 md:h-72 dark:border-gray-600" />
            <div className="h-48 rounded-lg border-2 border-dashed border-gray-300 md:h-72 dark:border-gray-600" />
            <div className="h-48 rounded-lg border-2 border-dashed border-gray-300 md:h-72 dark:border-gray-600" />
          </div>
          <div className="mb-4 h-96 rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-600" />
          <div className="grid grid-cols-2 gap-4">
            <div className="h-48 rounded-lg border-2 border-dashed border-gray-300 md:h-72 dark:border-gray-600" />
            <div className="h-48 rounded-lg border-2 border-dashed border-gray-300 md:h-72 dark:border-gray-600" />
            <div className="h-48 rounded-lg border-2 border-dashed border-gray-300 md:h-72 dark:border-gray-600" />
            <div className="h-48 rounded-lg border-2 border-dashed border-gray-300 md:h-72 dark:border-gray-600" />
          </div>
        </main> */}
      </div>
    </>
  );
};

export default AdminSidebar;
