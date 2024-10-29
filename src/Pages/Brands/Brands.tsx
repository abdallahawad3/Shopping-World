import { useSelector } from "react-redux";
import {
  getAllBrand,
  getPaginationBrand,
} from "../../app/feature/Brands/brandSlice";
import BrandCard from "../../components/Brands/BrandCard";
import { useAppDispatch, type RootState } from "../../app/store";
import { useEffect } from "react";
import Pagination from "../../components/utils/Pagination";

const BrandsPage = () => {
  const {
    data,
    isLoading,
    paginationResult: { numberOfPages },
  } = useSelector((state: RootState) => state.allBrand);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getAllBrand());
  }, [dispatch]);

  // Handle Page Click
  const handleClickPage = (val: number) => {
    dispatch(getPaginationBrand(val));
  };
  if (isLoading) return <h1>Is Loading...🔃</h1>;

  return (
    <main className="py-10">
      <div className="container mb-7 grid justify-center gap-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {data.map((ele) => (
          <BrandCard key={ele._id} brand={ele} />
        ))}
      </div>
      <div className="text-center">
        <Pagination onClickPage={handleClickPage} numsOfPages={numberOfPages} />
      </div>
    </main>
  );
};

export default BrandsPage;
