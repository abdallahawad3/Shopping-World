import { useSelector } from "react-redux";
import CategoryCard from "../Category/CategoryCard";
import SubTitle from "../utils/SubTitle";
import { useAppDispatch, type RootState } from "../../app/store";
import { useEffect } from "react";
import { getAllCategory } from "../../app/feature/CategorySlice/CategorySlice";

const HomeCategory = () => {
  const { data, isLoading } = useSelector(
    (state: RootState) => state.allCategory,
  );

  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getAllCategory(7));
  }, [dispatch]);
  if (isLoading) return <h1>IS LOADING...🔃🔃</h1>;
  return (
    <div>
      <SubTitle
        btnTitle="Show More"
        redirectPath="/allCategory"
        title="All Category"
      />
      <div className="mt-6 grid grid-cols-2 justify-center gap-x-1 gap-y-7 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-7 xl:gap-y-0">
        {data.slice(0, 7).map((ele) => (
          <CategoryCard category={ele} key={ele.name} />
        ))}
      </div>
    </div>
  );
};

export default HomeCategory;
