import ProductCard from "../utils/ProductCard";
import SubTitle from "../utils/SubTitle";

const MostSeals = () => {
  return (
    <div>
      <SubTitle redirectPath="/" title="Most Seals" btnTitle="Show More" />
      <div className="mt-6 grid  gap-2 md:grid-cols-4">
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
      </div>
    </div>
  );
};

export default MostSeals;
