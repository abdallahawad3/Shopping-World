// import CardProductsSection from "../../components/Home/CardProductsSection";
import { useParams } from "react-router-dom";
import ProductReview from "../../components/Products/ProductReview";
import ProductSlider from "../../components/Products/ProductSlider";
import { useSelector } from "react-redux";
import { useAppDispatch, type RootState } from "../../app/store";
import { useEffect, useState } from "react";
import {
  getProductsWithCategory,
  getSingleProduct,
} from "../../app/feature/ProductsSlice/productsSlice";
import CardProductsSection from "../../components/Home/CardProductsSection";
import CookieService from "../../services/CookieService";
import {
  addProductToWishlist,
  deleteProductFromWishlist,
  getWishlistData,
} from "../../app/feature/Wishlist/wishlistSlice";
import toast from "react-hot-toast";
import { FaHeart, FaRegHeart } from "react-icons/fa";
const ProductPage = () => {
  const user = CookieService.get("user") ? CookieService.get("user") : false;
  const isLogged = user ? user.token : false;
  const { id } = useParams();
  const data = useSelector((state: RootState) => state.wishlist.data);
  const isInWishlist = data.some((item) => item._id === id);
  const dispatch = useAppDispatch();

  const { singleProduct } = useSelector(
    (state: RootState) => state.allProducts,
  );
  const [categoryId, setCategoryId] = useState("");
  const { productsCategory, isLoading } = useSelector(
    (state: RootState) => state.allProducts,
  );
  useEffect(() => {
    if (id) {
      dispatch(getSingleProduct(id));
      setCategoryId(singleProduct.category);
    }
    if (categoryId.length != 0) {
      dispatch(getProductsWithCategory(categoryId));
    }
  }, [dispatch, id, singleProduct.category, categoryId]);

  useEffect(() => {
    dispatch(getWishlistData());
  }, [dispatch, id]);

  const handleToggleWishlist = () => {
    if (isLogged && id) {
      if (isInWishlist) {
        dispatch(deleteProductFromWishlist(id));
      } else {
        dispatch(addProductToWishlist(id));
      }
    } else {
      toast.error("You should log in first", {
        position: "top-right",
      });
    }
  };

  return (
    <section className="bg-white py-8 antialiased md:py-16 dark:bg-gray-900">
      <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
        <div className="lg:grid lg:grid-cols-2 lg:gap-8 xl:gap-16">
          <div className="mx-auto max-w-md shrink-0 lg:max-w-lg">
            <ProductSlider
              imageCover={singleProduct.imageCover}
              images={singleProduct.images}
            />
          </div>

          <div className="mt-6 sm:mt-8 lg:mt-0">
            <h1 className="text-xl font-semibold text-gray-900 sm:text-2xl dark:text-white">
              {singleProduct.title}
            </h1>
            <p className="mt-2 text-lg font-semibold  text-gray-900 dark:text-gray-400">
              {singleProduct.description}
            </p>
            <div className="mt-4 sm:flex sm:items-center sm:gap-4">
              <p className="text-2xl font-extrabold text-gray-900 sm:text-3xl dark:text-white">
                ${singleProduct.price}
              </p>

              <div className="mt-2 flex items-center gap-2 sm:mt-0">
                <div className="flex items-center gap-1">
                  <svg
                    className="size-6 text-yellow-300"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z" />
                  </svg>
                </div>
                <p className="text-sm font-medium leading-none text-gray-500 dark:text-gray-400">
                  ({singleProduct.ratingsQuantity})
                </p>
              </div>
            </div>

            <div className="mt-6 sm:mt-8 sm:flex sm:items-center sm:gap-4">
              <button type="button" onClick={handleToggleWishlist}>
                {isInWishlist ? (
                  <div className="mt-4 flex  items-center justify-center gap-1 rounded-lg bg-gray-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-gray-800 focus:outline-none focus:ring-4 focus:ring-gray-300 sm:mt-0 dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800">
                    <FaHeart fill="red" /> <span>Remove From Favorite</span>
                  </div>
                ) : (
                  <div className="mt-4 flex  items-center justify-center gap-1 rounded-lg bg-gray-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-gray-800 focus:outline-none focus:ring-4 focus:ring-gray-300 sm:mt-0 dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800">
                    <FaRegHeart /> <span>Add To Favorite</span>
                  </div>
                )}
              </button>
              <button type="button">
                {isInWishlist ? (
                  <div className="mt-4 flex items-center justify-center rounded-lg bg-primary-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 sm:mt-0 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                    <svg
                      className="-ms-2 me-2 size-5"
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
                        d="M4 4h1.5L8 16m0 0h8m-8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm.75-3H7.5M11 7H6.312M17 4v6m-3-3h6"
                      />
                    </svg>{" "}
                    <span>Remove From Cart</span>
                  </div>
                ) : (
                  <div className="mt-4 flex items-center justify-center rounded-lg bg-primary-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 sm:mt-0 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                    <svg
                      className="-ms-2 me-2 size-5"
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
                        d="M4 4h1.5L8 16m0 0h8m-8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm.75-3H7.5M11 7H6.312M17 4v6m-3-3h6"
                      />
                    </svg>
                    <span>Add To Cart</span>
                  </div>
                )}
              </button>
            </div>

            <hr className="my-6 border-gray-200 md:my-8 dark:border-gray-800" />

            <p className="mb-6 text-gray-500 dark:text-gray-400">
              {singleProduct.description}
            </p>

            <p className="text-gray-500 dark:text-gray-400">
              Two Thunderbolt USB 4 ports and up to two USB 3 ports. Ultrafast
              Wi-Fi 6 and Bluetooth 5.0 wireless. Color matched Magic Mouse with
              Magic Keyboard or Magic Keyboard with Touch ID.
            </p>
          </div>
        </div>
      </div>
      <div>
        <ProductReview />
      </div>
      <div className="container mt-5">
        {productsCategory && (
          <CardProductsSection
            products={productsCategory}
            isLoading={isLoading}
            title="Same Products"
            btnTitle="Show More"
          />
        )}
      </div>
    </section>
  );
};

export default ProductPage;
