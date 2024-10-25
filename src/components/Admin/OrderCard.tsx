const OrderCard = () => {
  return (
    <>
      <div className="m-[30px] rounded-lg border border-gray-200 bg-white p-4 shadow-sm md:m-0 md:p-6 dark:border-gray-700 dark:bg-gray-800">
        <div className="space-y-4 md:flex md:items-center md:justify-between md:gap-6 md:space-y-0">
          <a href="#" className="shrink-0 md:order-1">
            <img
              className="size-20 dark:hidden"
              src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/imac-front.svg"
              alt="imac image"
            />
            <img
              className="hidden size-20 dark:block"
              src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/imac-front-dark.svg"
              alt="imac image"
            />
          </a>

          <label htmlFor="counter-input" className="sr-only">
            Choose quantity:
          </label>
          <div className="flex items-center justify-between md:order-3 md:justify-end">
            <div className="flex items-center gap-1">
              <span className="text-base font-bold text-gray-900 dark:text-white">
                Quantity:
              </span>
              <span className="border-0 bg-transparent text-center text-sm font-medium text-gray-900 focus:outline-none focus:ring-0 dark:text-white">
                1
              </span>
            </div>
            <div className="text-end md:order-4 lg:w-32"></div>
          </div>

          <div className="w-full min-w-0 flex-1 space-y-4 md:order-2 md:max-w-md">
            <a
              href="#"
              className="text-base font-medium text-gray-900 hover:underline dark:text-white"
            >
              PC system All in One APPLE iMac (2023) mqrq3ro/a, Apple M3, 24"
              Retina 4.5K, 8GB, SSD 256GB, 10-core GPU, Keyboard layout INT
            </a>

            <div className="flex items-center justify-between gap-4">
              <button
                type="button"
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
              <p className="text-base font-bold text-gray-900 dark:text-white">
                Price: $1000
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderCard;
