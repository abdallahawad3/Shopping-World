import ProductCard from "./ProductCard";
import ProductSidebar from "../Products/ProductSidebar";
import { useSelector } from "react-redux";
import { useAppDispatch, type RootState } from "../../app/store";
import { useEffect } from "react";
import { getAllProducts } from "../../app/feature/ProductsSlice/productsSlice";
import Pagination from "./Pagination";

const ProductsList = () => {
  const { allProduct, paginationResult } = useSelector(
    (state: RootState) => state.allProducts,
  );
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getAllProducts(1));
  }, [dispatch]);

  // Handle Page Click
  const handlePageClick = (value: number) => {
    dispatch(getAllProducts(value));
  };
  return (
    <>
      <div className="flex justify-center gap-5">
        <div className="hidden md:flex">
          <ProductSidebar />
        </div>
        <div className="mt-7 grid gap-4 bg-gray-50 p-3 px-10  sm:p-5  md:ms-[16rem] md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 dark:bg-gray-900">
          {allProduct &&
            allProduct
              .slice(0, 10)
              .map((ele) => <ProductCard product={ele} key={ele._id} />)}
        </div>
      </div>
      <div className="my-5 text-center">
        <Pagination
          numsOfPages={paginationResult.numberOfPages}
          onClickPage={handlePageClick}
        />
      </div>
    </>
  );
};

export default ProductsList;
