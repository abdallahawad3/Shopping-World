import { useSelector } from "react-redux";
import {
  deleteProductFromCart,
  removeFromCartAction,
} from "../../app/feature/Cart/cartSlice";
import { useAppDispatch, type RootState } from "../../app/store";
import type { IProduct } from "../../interfaces";
import { textSlice } from "../../utils";

interface IProps {
  product: IProduct;
}

const CartItem = ({ product }: IProps) => {
  const img = product.imageCover.indexOf("https");
  const { existCartProduct } = useSelector((state: RootState) => state.cart);

  const dispatch = useAppDispatch();
  return (
    <div className="mb-2 space-y-2 rounded-lg  border  border-gray-200 bg-white shadow-sm md:p-6 dark:border-gray-700 dark:bg-gray-800">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <img
            className="size-12 rounded-full"
            src={
              img !== -1 ? product.imageCover.slice(img) : product.imageCover
            }
            alt={product.title}
          />
          <p>{textSlice(product.title, 11)}</p>
        </div>
        <p className="font-bold">{product.price}$</p>
      </div>
      <p>Quantity: {product.qu}</p>
      <div className="flex items-center gap-4">
        <button
          type="button"
          className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-900 hover:underline dark:text-gray-400 dark:hover:text-white"
        >
          <svg
            className="me-1 size-5"
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
              d="M12.01 6.001C6.5 1 1 8 5.782 13.001L12.011 20l6.23-7C23 8 17.5 1 12.01 6.002Z"
            ></path>
          </svg>
          Add to Favorites
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
