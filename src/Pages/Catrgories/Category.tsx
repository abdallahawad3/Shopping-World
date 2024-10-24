import CategoryCard from "../../components/Category/CategoryCard";
import Pagination from "../../components/utils/Pagination";

const CategoryPage = () => {
  return (
    <main className="my-10">
      <div className="container mb-20 grid justify-center gap-2 md:grid-cols-3 md:gap-y-10 lg:grid-cols-5 xl:grid-cols-6">
        <CategoryCard />
        <CategoryCard />
        <CategoryCard />
        <CategoryCard />
        <CategoryCard />
        <CategoryCard />
        <CategoryCard />
        <CategoryCard />
        <CategoryCard />
        <CategoryCard />
        <CategoryCard />
        <CategoryCard />
      </div>
      <div className="text-center">
        <Pagination />
      </div>
    </main>
  );
};

export default CategoryPage;
