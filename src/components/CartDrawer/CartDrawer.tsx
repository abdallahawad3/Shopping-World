import { useSelector } from "react-redux";
import { useAppDispatch, type RootState } from "../../app/store";
import { closeDrawerAction } from "../../app/feature/Global/globalSlice";
import { useEffect } from "react";
import CartItem from "../Cart/CartItem";
import {
  clearAllCartProductAction,
  getAllCartProducts,
  removeAllProductsCart,
} from "../../app/feature/Cart/cartSlice";

const CartDrawer = () => {
  const { isOpenCartDrawer } = useSelector(
    (state: RootState) => state.globalSlice,
  );

  const { cartProducts } = useSelector((state: RootState) => state.cart);

  const dispatch = useAppDispatch();
  useEffect(() => {
    isOpenCartDrawer
      ? document.querySelector("body")?.classList.add("overflow-hidden")
      : document.querySelector("body")?.classList.remove("overflow-hidden");
    dispatch(getAllCartProducts());
  }, [isOpenCartDrawer, dispatch]);

  return (
    <>
      <div>
        <div
          className={
            !isOpenCartDrawer
              ? "fixed right-0 top-0 z-[200] h-screen w-80 translate-x-full overflow-y-auto bg-white transition-transform dark:bg-gray-800"
              : "fixed right-0 top-0 z-[200] h-screen w-80 -transform-none overflow-y-auto bg-white  transition-transform dark:bg-gray-800 "
          }
          tabIndex={-1}
          aria-labelledby="drawer-label"
          role={isOpenCartDrawer ? "" : "dialog"}
        >
          <div className=" right-5 top-0 flex  items-center justify-between rounded p-2 dark:bg-gray-700 dark:hover:text-white">
            <h5 className="inline-flex items-center gap-1 text-base font-semibold text-gray-500 dark:text-gray-400">
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
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 4h1.5L9 16m0 0h8m-8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm-8.5-3h9.25L19 7H7.312"
                />
              </svg>
              Your Cart Products
            </h5>
            <button
              onClick={() => {
                dispatch(closeDrawerAction());
              }}
              type="button"
              className="flex size-8 items-center justify-center rounded-lg bg-transparent text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white"
            >
              <svg
                className="size-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
              <span className="sr-only">Close menu</span>
            </button>
          </div>
          {/* Body */}
          <div className="mt-[36px] p-4">
            {cartProducts &&
              cartProducts.map((ele) => (
                <CartItem product={ele} key={ele._id} />
              ))}
          </div>
          {/* Footer */}
          <div className="relative bottom-0 mb-4 grid  grid-cols-2 gap-4 px-4">
            <button
              onClick={() => {
                dispatch(closeDrawerAction());
                window.location.assign("/user/cart");
              }}
              className="rounded-lg border border-gray-200 bg-white px-4 py-2 text-center text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700"
            >
              All Product Cart
            </button>
            <button
              onClick={() => {
                dispatch(clearAllCartProductAction());
                dispatch(removeAllProductsCart());
              }}
              className="rounded-lg bg-red-700 px-4 py-2 text-center text-sm font-medium text-white hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
            >
              Clear All
            </button>
          </div>
        </div>
      </div>
      {isOpenCartDrawer ? (
        <div
          onClick={() => {
            dispatch(closeDrawerAction());
          }}
          drawer-backdrop=""
          className="fixed top-0 z-[100] h-screen w-screen bg-gray-900/50 dark:bg-gray-900/80"
        ></div>
      ) : (
        ""
      )}
    </>
  );
};

export default CartDrawer;
