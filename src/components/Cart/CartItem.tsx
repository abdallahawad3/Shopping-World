import { useSelector } from "react-redux";
import {
  deleteProductFromCart,
  removeFromCartAction,
} from "../../app/feature/Cart/cartSlice";
import { useAppDispatch, type RootState } from "../../app/store";
import type { IProduct } from "../../interfaces";
import { textSlice } from "../../utils";
import {
  addToWishList,
  getAllWishlistProducts,
  removeFromWishList,
} from "../../app/feature/Wishlist/wishlistSlice";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useEffect } from "react";

interface IProps {
  product: IProduct;
}

const CartItem = ({ product }: IProps) => {
  const { existCartProduct } = useSelector((state: RootState) => state.cart);
  const dispatch = useAppDispatch();
  const { wishlistProducts } = useSelector(
    (state: RootState) => state.wishlist,
  );

  const productExist = wishlistProducts.find((ele) => ele._id == product.id);

  useEffect(() => {
    dispatch(getAllWishlistProducts());
  }, [dispatch]);

  return (
    <div className="mb-2 space-y-2 rounded-lg border  border-gray-200  bg-white p-2 shadow-sm md:p-6 dark:border-gray-700 dark:bg-gray-800">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <img
            className="size-12 rounded-full"
            src={
              product.imageCover.search("https:") != -1
                ? product.imageCover.slice(product.imageCover.search("https:"))
                : product.imageCover
            }
            alt={product.title}
          />
          <p>{textSlice(product.title, 11)}</p>
        </div>
        <p className="font-bold">{product.price}$</p>
      </div>
      <p>Quantity: {product.qu ? product.qu : product.count}</p>
      <div className="flex items-center gap-4">
        <button
          type="button"
          onClick={() => {
            if (productExist) {
              dispatch(removeFromWishList(product.id));
            } else {
              dispatch(addToWishList(product.id));
            }
          }}
        >
          {productExist ? (
            <span className="flex items-center">
              <FaHeart fill="red" />{" "}
              <span className="text-sm">Remove From wishlist</span>
            </span>
          ) : (
            <span className="flex items-center">
              <FaRegHeart /> Add to wishlist
            </span>
          )}
        </button>

        <button
          type="button"
          className="inline-flex items-center text-sm font-medium text-red-600 hover:underline dark:text-red-500"
          onClick={() => {
            const productToRemoveFromCart = existCartProduct.find((ele) =>
              ele.product === product._id ? ele._id : "",
            );
            dispatch(removeFromCartAction(product));
            dispatch(deleteProductFromCart(productToRemoveFromCart!._id));
          }}
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
            ></path>
          </svg>
          Remove
        </button>
      </div>
    </div>
  );
};

export default CartItem;
