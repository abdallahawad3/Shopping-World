import CategoryCard from "../../components/Category/CategoryCard";
import Pagination from "../../components/utils/Pagination";
import { useAppDispatch, type RootState } from "../../app/store";
import { useEffect } from "react";
import {
  getAllCategory,
  getPaginationCategory,
} from "../../app/feature/CategorySlice/CategorySlice";
import { useSelector } from "react-redux";

const CategoryPage = () => {
  const {
    data,
    isLoading,
    paginationResult: { numberOfPages },
  } = useSelector((state: RootState) => state.allCategory);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getAllCategory(5));
  }, [dispatch]);
  const clickPage = (val: number) => {
    dispatch(getPaginationCategory(val));
  };
  if (isLoading) return <h1>Loading...🔃🔃</h1>;

  return (
    <main className="my-10">
      <div className="container mb-10 grid grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {data.slice(0, 10).map((cat, idx) => (
          <CategoryCard key={idx} category={cat} />
        ))}
      </div>
      <div className="text-center">
        <Pagination onClickPage={clickPage} numsOfPages={numberOfPages} />
      </div>
    </main>
  );
};

export default CategoryPage;
