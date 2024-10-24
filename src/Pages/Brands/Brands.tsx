import BrandCard from "../../components/Brands/BrandCard";
import Pagination from "../../components/utils/Pagination";

const BrandsPage = () => {
  return (
    <main className="py-10">
      <div className="container mb-7 grid justify-center gap-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        <BrandCard />
        <BrandCard />
        <BrandCard />
        <BrandCard />
        <BrandCard />
        <BrandCard />
        <BrandCard />
        <BrandCard />
        <BrandCard />
        <BrandCard />
        <BrandCard />
        <BrandCard />
        <BrandCard />
        <BrandCard />
        <BrandCard />
      </div>
      <div className="text-center">
        <Pagination />
      </div>
    </main>
  );
};

export default BrandsPage;
