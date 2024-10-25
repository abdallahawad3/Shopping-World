import { useState } from "react";
import RatingStars from "../utils/RatingStars";
import ProductReviewCart from "./ProductReviewCart";

const ProductReview = () => {
  const [rating, setRating] = useState(3.2);

  const handleRatingChange = (newRating: number) => {
    setRating(newRating); // Update the rating state when a star is clicked
  };
  return (
    <div>
      <section className="bg-white py-8 antialiased md:py-16 dark:bg-gray-800">
        <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
          <div className="mb-2 flex items-center gap-2">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
              Reviews
            </h2>
            <div className="mt-2 flex items-center gap-2 sm:mt-0">
              <div>
                <RatingStars
                  rating={rating}
                  onChange={handleRatingChange}
                  maxStars={5}
                  size={20}
                  precision={0.25} // Set precision to 0.5 for half stars
                />
              </div>
              <p className="text-sm font-medium leading-none text-gray-500 dark:text-gray-400">
                (4.6)
              </p>
              <a
                href="#"
                className="text-sm font-medium leading-none text-gray-900 underline hover:no-underline dark:text-white"
              >
                645 Reviews
              </a>
            </div>
          </div>
          <form className="space-y-2">
            <div className="sm:col-span-2">
              <label
                htmlFor="message"
                className="mb-2 block text-sm font-medium text-gray-900 dark:text-gray-400"
              >
                Your Review
              </label>
              <textarea
                id="message"
                rows={6}
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
                placeholder="Leave a Review..."
              ></textarea>
            </div>
            <button
              type="submit"
              className="rounded-lg bg-primary-700 px-5 py-3 text-center text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 sm:w-fit dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
            >
              Send Review
            </button>
          </form>
          <div className="mt-5 space-y-4 border-t">
            <ProductReviewCart />
            <ProductReviewCart />
            <ProductReviewCart />
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProductReview;
