import CategoryCard from "../Category/CategoryCard";
import SubTitle from "../utils/SubTitle";

const HomeCategory = () => {
  return (
    <div>
      <SubTitle
        btnTitle="Show More"
        redirectPath="/allCategory"
        title="All Category"
      />
      <div className="mt-6 grid grid-cols-2 justify-center gap-x-1 gap-y-7 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-7 xl:gap-y-0">
        <CategoryCard />
        <CategoryCard />
        <CategoryCard />
        <CategoryCard />
        <CategoryCard />
        <CategoryCard />
        <CategoryCard />
      </div>
    </div>
  );
};

export default HomeCategory;
