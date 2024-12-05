import { Link } from "react-router-dom";
import CookieService from "../../services/CookieService";
import { useSelector } from "react-redux";
import { useAppDispatch, type RootState } from "../../app/store";
import { openDrawerAction } from "../../app/feature/Global/globalSlice";

const NavbarComponent = () => {
  const user = CookieService.get("user") ? CookieService.get("user") : false;
  const isLogin = user ? user.token : "";
  const { cartProducts } = useSelector((state: RootState) => state.cart);
  const dispatch = useAppDispatch();
  return (
    <nav className="sticky left-0 top-0 z-[100] w-full bg-white antialiased shadow-lg dark:bg-gray-800">
      <div className="mx-auto max-w-screen-xl p-4 2xl:px-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-8">
            <div className="shrink-0">
              <Link to="/">
                <img className="block h-8 w-auto " src="./ecommerce.svg" />
              </Link>
            </div>
            <ul className="hidden items-center justify-start gap-6 py-3 sm:justify-center md:gap-8 lg:flex">
              <li>
                <Link
                  to="/"
                  className="flex text-sm font-medium text-gray-900 hover:text-primary-700 dark:text-white dark:hover:text-primary-500"
                >
                  Home
                </Link>
              </li>
              <li className="shrink-0">
                <Link
                  to="/products"
                  className="flex text-sm font-medium text-gray-900 hover:text-primary-700 dark:text-white dark:hover:text-primary-500"
                >
                  All Products
                </Link>
              </li>
              <li className="shrink-0">
                <Link
                  to="/brands"
                  className="text-sm font-medium text-gray-900 hover:text-primary-700 dark:text-white dark:hover:text-primary-500"
                >
                  All Brands
                </Link>
              </li>
              <li className="shrink-0">
                <Link
                  to="/allCategory"
                  className="text-sm font-medium text-gray-900 hover:text-primary-700 dark:text-white dark:hover:text-primary-500"
                >
                  All Categories
                </Link>
              </li>
            </ul>
          </div>
          <div className="flex items-center lg:space-x-2">
            <button
              type="button"
              className="relative inline-flex items-center justify-center rounded-lg p-2 text-sm font-medium leading-none text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
            >
              <span className="sr-only">Cart</span>
              <svg
                className="size-5 lg:me-1"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width={24}
                height={24}
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 4h1.5L9 16m0 0h8m-8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm-8.5-3h9.25L19 7H7.312"
                />
              </svg>
              <button
                className="hidden sm:flex"
                onClick={() => {
                  dispatch(openDrawerAction());
                }}
              >
                My Cart
              </button>

              <span className="absolute left-0 top-[-9px] flex size-5 items-center justify-center rounded-full bg-red-700 font-normal text-white">
                {cartProducts.length}
              </span>
            </button>

            <button
              type="button"
              className="relative inline-flex items-center justify-center rounded-lg p-2 text-sm font-medium leading-none text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
            >
              <Link className="sr-only" to="/user/wishlist">
                Wishlist
              </Link>
              <svg
                className="size-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 6C6.5 1 1 8 5.8 13l6.2 7 6.2-7C23 8 17.5 1 12 6Z"
                />
              </svg>

              <Link className="hidden sm:flex" to="/user/wishlist">
                My Wishlist
              </Link>
              <span className="absolute left-0 top-[-9px] flex size-5 items-center justify-center rounded-full bg-red-700 font-normal text-white">
                {0}
              </span>
            </button>
            {/* ACCOUNT */}
            {isLogin.length != 0 ? (
              <>
                <button
                  id="userDropdownButton1"
                  data-dropdown-toggle="userDropdown1"
                  type="button"
                  className="inline-flex items-center justify-center rounded-lg p-2 text-sm font-medium leading-none text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                >
                  <svg
                    className="me-1 size-5"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width={24}
                    height={24}
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke="currentColor"
                      strokeWidth={2}
                      d="M7 17v1a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-1a3 3 0 0 0-3-3h-4a3 3 0 0 0-3 3Zm8-9a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                    />
                  </svg>
                  Account
                  <svg
                    className="ms-1 size-4 text-gray-900 dark:text-white"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width={24}
                    height={24}
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="m19 9-7 7-7-7"
                    />
                  </svg>
                </button>
                <div
                  id="userDropdown1"
                  className="z-10 hidden w-56 divide-y divide-gray-100 overflow-hidden overflow-y-auto rounded-lg bg-white antialiased shadow dark:divide-gray-600 dark:bg-gray-700"
                >
                  {user.data.role === "user" ? (
                    <ul className="p-2 text-start text-sm font-medium text-gray-900 dark:text-white">
                      <li>
                        <Link
                          to="/user"
                          className="inline-flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-600"
                        >
                          {user.data.name}
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/user"
                          className="inline-flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-600"
                        >
                          My Orders
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/user"
                          className="inline-flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-600"
                        >
                          Favorites
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/user/address"
                          className="inline-flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-600"
                        >
                          Delivery Addresses
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/user/profile"
                          className="inline-flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-600"
                        >
                          My Profile
                        </Link>
                      </li>
                    </ul>
                  ) : (
                    <ul className="p-2 text-start text-sm font-medium text-gray-900 dark:text-white">
                      <li>
                        <Link
                          to="/admin"
                          className="inline-flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-600"
                        >
                          Dashboard
                        </Link>
                      </li>
                    </ul>
                  )}
                  <div className="p-2 text-sm font-medium text-gray-900 dark:text-white">
                    <button
                      onClick={() => {
                        CookieService.remove("user");
                        window.location.reload();
                      }}
                      className="inline-flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-600"
                    >
                      Sign Out
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <Link to={"/login"}>
                <button className="rounded-md bg-blue-600 px-4 py-1 text-white hover:bg-blue-700">
                  Login
                </button>
              </Link>
            )}
            <button
              type="button"
              data-collapse-toggle="ecommerce-navbar-menu-1"
              aria-controls="ecommerce-navbar-menu-1"
              aria-expanded="false"
              className="inline-flex items-center justify-center rounded-md p-2 text-gray-900 hover:bg-gray-100 lg:hidden dark:text-white dark:hover:bg-gray-700"
            >
              <span className="sr-only">Open Menu</span>
              <svg
                className="size-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width={24}
                height={24}
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeWidth={2}
                  d="M5 7h14M5 12h14M5 17h14"
                />
              </svg>
            </button>
          </div>
        </div>
        <div
          id="ecommerce-navbar-menu-1"
          className="mt-4 hidden rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 dark:border-gray-600 dark:bg-gray-700"
        >
          <ul className="space-y-3 text-sm font-medium text-gray-900 dark:text-white">
            <li>
              <a
                href="#"
                className="hover:text-primary-700 dark:hover:text-primary-500"
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="#"
                className="hover:text-primary-700 dark:hover:text-primary-500"
              >
                Best Sellers
              </a>
            </li>
            <li>
              <a
                href="#"
                className="hover:text-primary-700 dark:hover:text-primary-500"
              >
                Gift Ideas
              </a>
            </li>
            <li>
              <a
                href="#"
                className="hover:text-primary-700 dark:hover:text-primary-500"
              >
                Games
              </a>
            </li>
            <li>
              <a
                href="#"
                className="hover:text-primary-700 dark:hover:text-primary-500"
              >
                Electronics
              </a>
            </li>
            <li>
              <a
                href="#"
                className="hover:text-primary-700 dark:hover:text-primary-500"
              >
                Home &amp; Garden
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};
// className=""
export default NavbarComponent;
