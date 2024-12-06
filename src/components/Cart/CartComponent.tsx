import { Link } from "react-router-dom";
import type { IProduct } from "../../interfaces";
import {
  deleteProductFromCart,
  getAllCartProducts,
  removeFromCartAction,
  updateCartQuantity,
} from "../../app/feature/Cart/cartSlice";
import { useAppDispatch, type RootState } from "../../app/store";
import { useEffect, useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import {
  addToWishList,
  getAllWishlistProducts,
  removeFromWishList,
} from "../../app/feature/Wishlist/wishlistSlice";
import { useSelector } from "react-redux";
import CookieService from "../../services/CookieService";

interface IProps {
  product: IProduct;
}

const CartComponent = ({ product }: IProps) => {
  const [count, setCount] = useState(product.count);
  const user = CookieService.get("user") ? CookieService.get("user") : false;

  const isLogged = user ? user.token : false;
  const dispatch = useAppDispatch();

  const { wishlistProducts } = useSelector(
    (state: RootState) => state.wishlist,
  );

  const productExist = wishlistProducts.find((ele) => ele._id == product.id);

  useEffect(() => {
    dispatch(getAllWishlistProducts());
    dispatch(getAllCartProducts());
  }, [dispatch]);

  return (
    <>
      <div className="m-[30px] rounded-lg border border-gray-200 bg-white p-4 shadow-sm md:m-0 md:p-6 dark:border-gray-700 dark:bg-gray-800">
        <div className="space-y-4 md:flex md:items-center md:justify-between md:gap-6 md:space-y-0">
          <a href="#" className="shrink-0 md:order-1">
            <img
              className="size-20 "
              src={
                product.imageCover.search("https:") != -1
                  ? product.imageCover.slice(
                      product.imageCover.search("https:"),
                    )
                  : product.imageCover
              }
              alt="imac image"
            />
          </a>
          <div className="flex items-center justify-between md:order-3 md:justify-end">
            <div className="flex items-center">
              <input
                className="w-10 shrink-0 border-0 bg-transparent text-center text-sm font-medium text-gray-900 focus:outline-none focus:ring-0 dark:text-white"
                value={count}
                onChange={(e) => {
                  setCount(+e.target.value);
                }}
              />

              <button
                onClick={() => {
                  dispatch(
                    updateCartQuantity({ id: product._id, quantity: count }),
                  );
                }}
                type="button"
                className="inline-flex items-center justify-center rounded-md border border-gray-300 bg-gray-100 px-2 py-1 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700"
              >
                Done
              </button>
            </div>
            <div className="text-end md:order-4 md:w-32">
              <p className="text-base font-bold text-gray-900 dark:text-white">
                ${product.price * product.count}
              </p>
            </div>
          </div>

          <div className="w-full min-w-0 flex-1 space-y-4 md:order-2 md:max-w-md">
            <Link
              to={`/product/${product.id}`}
              className="text-base font-medium text-gray-900 hover:underline dark:text-white"
            >
              {product.title}
            </Link>

            <div className="flex items-center gap-4">
              <button
                type="button"
                onClick={() => {
                  if (isLogged) {
                    if (productExist) {
                      dispatch(removeFromWishList(product.id));
                    } else {
                      dispatch(addToWishList(product.id));
                    }
                  }
                }}
              >
                {productExist ? (
                  <span className="flex items-center gap-1">
                    <FaHeart fill="red" /> Remove From Favorites
                  </span>
                ) : (
                  <span className="flex items-center gap-1">
                    <FaRegHeart /> Add to Favorites
                  </span>
                )}
              </button>

              <button
                type="button"
                onClick={() => {
                  dispatch(removeFromCartAction(product));
                  dispatch(deleteProductFromCart(product._id));
                }}
                className="inline-flex items-center text-sm font-medium text-red-600 hover:underline dark:text-red-500"
              >
                <svg
                  className="me-1.5 size-5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18 17.94 6M18 18 6.06 6"
                  />
                </svg>
                Remove
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CartComponent;
