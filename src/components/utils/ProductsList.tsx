import ProductCard from "./ProductCard";
import ProductSidebar from "../Products/ProductSidebar";
// import Pagination from "./Pagination";

const ProductsList = () => {
  return (
    <>
      <div className="flex justify-center gap-5">
        <div className="hidden md:flex">
          <ProductSidebar />
        </div>
        <div className="mt-8 grid  gap-4 px-10 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
        </div>
      </div>
    </>
  );
};

export default ProductsList;
