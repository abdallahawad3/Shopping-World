import { useAppDispatch, type RootState } from "../../app/store";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { getAllCategory } from "../../app/feature/CategorySlice/CategorySlice";
import { getAllBrand } from "../../app/feature/Brands/brandSlice";

const ProductSidebar = () => {
  const { data: dataCategory } = useSelector(
    (state: RootState) => state.allCategory,
  );
  const { data: dataBrand } = useSelector((state: RootState) => state.allBrand);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getAllCategory(100));
    dispatch(getAllBrand(100));
  }, [dispatch]);

  return (
    <>
      <div className="bg-gray-50 antialiased dark:bg-gray-900">
        <aside
          className="fixed left-0 top-0 z-40 h-screen w-64 -translate-x-full border-r border-gray-200 bg-white pt-14 transition-transform md:translate-x-0 dark:border-gray-700 dark:bg-gray-800"
          aria-label="Sidenav"
          id="drawer-navigation"
        >
          <div className="h-full overflow-y-auto bg-white px-3 py-5 dark:bg-gray-800">
            <ul className="space-y-2">
              <div className="border-b">
                <h3 className="mb-2 mt-5 text-xl font-semibold text-blue-600">
                  Price
                </h3>
                <div className="mb-6 grid gap-6 md:grid-cols-2">
                  <div>
                    <label
                      htmlFor="from"
                      className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                    >
                      From
                    </label>
                    <input
                      type="number"
                      id="from"
                      className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="to"
                      className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                    >
                      To
                    </label>
                    <input
                      type="number"
                      id="to"
                      className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>
              <div className="border-b">
                <h3 className="mb-2 mt-5 text-xl font-semibold text-blue-600">
                  Category
                </h3>
                {dataCategory &&
                  dataCategory.map((ele) => (
                    <div key={ele._id} className="mb-4 flex items-center">
                      <input
                        id={ele._id}
                        type="checkbox"
                        value=""
                        className="size-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
                      />
                      <label
                        htmlFor={ele._id}
                        className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                      >
                        {ele.name}
                      </label>
                    </div>
                  ))}
              </div>
              <div className="border-b">
                <h3 className="mb-2 mt-5 text-xl font-semibold text-blue-600">
                  Brands
                </h3>
                {dataBrand &&
                  dataBrand.map((ele) => (
                    <div key={ele._id} className="mb-4 flex items-center">
                      <input
                        id={ele._id}
                        type="checkbox"
                        value=""
                        className="size-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
                      />
                      <label
                        htmlFor={ele._id}
                        className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                      >
                        {ele.name}
                      </label>
                    </div>
                  ))}
              </div>
            </ul>
          </div>
        </aside>
      </div>
    </>
  );
};

export default ProductSidebar;
