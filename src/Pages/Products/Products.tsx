import ProductCard from "../../components/utils/ProductCard";
import ProductSidebar from "../../components/Products/ProductSidebar";
import { useSelector } from "react-redux";
import { useAppDispatch, type RootState } from "../../app/store";
import { useEffect, useState } from "react";
import { filterProducts } from "../../app/feature/ProductsSlice/productsSlice";
import Pagination from "../../components/utils/Pagination";

const ProductsPage = () => {
  const [allCategories, setAllCategories] = useState("");
  const [allBrands, setAllBrands] = useState("");
  const [lessThanPrice, setLessThanPrice] = useState<number>(0);
  const [greeterThanPrice, setGreeterThanPrice] = useState<number>(0);
  console.log("lessThanPrice", lessThanPrice);
  console.log("greeterThanPrice", greeterThanPrice);
  const { flitteredProducts, paginationResult } = useSelector(
    (state: RootState) => state.allProducts,
  );
  const dispatch = useAppDispatch();
  useEffect(() => {
    setTimeout(() => {
      dispatch(
        filterProducts({
          page: 1,
          filter: `${allCategories}&${allBrands}`,
        }),
      );
    }, 1000);
  }, [dispatch, allCategories, allBrands]);

  const showAllCategories = async (cat: string[]) => {
    const allCat = cat.map((ele) => "category[in][]=" + ele).join("&");
    setAllCategories(allCat);
    dispatch(filterProducts({ page: 1, filter: allCategories }));
  };

  const showAllBrands = async (cat: string[]) => {
    const allBrand = cat.map((ele) => "brand=" + ele).join("&");
    setAllBrands(allBrand);
    dispatch(filterProducts({ page: 1, filter: allCategories }));
  };

  const handleLessThanPrice = (price: number) => {
    setLessThanPrice(price);
  };
  const handleGreeterThanPrice = (price: number) => {
    setGreeterThanPrice(price);
  };

  // Handle Page Click
  const handlePageClick = (value: number) => {
    dispatch(filterProducts({ page: value, filter: allCategories }));
  };
  return (
    <>
      <div className="flex justify-center gap-5">
        <div className="hidden md:flex">
          <ProductSidebar
            setAllCategories={showAllCategories}
            setAllBrands={showAllBrands}
            setGreeterThanPriceFun={handleGreeterThanPrice}
            setLessThanPriceFun={handleLessThanPrice}
          />
        </div>
        <div className="mt-7 grid gap-4 bg-gray-50 p-3 px-10  sm:p-5  md:ms-[16rem] md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 dark:bg-gray-900">
          {flitteredProducts &&
            flitteredProducts
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

export default ProductsPage;
