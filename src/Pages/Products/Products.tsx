import Pagination from "../../components/utils/Pagination";
import ProductsList from "../../components/utils/ProductsList";

const ProductsPage = () => {
  return (
    <>
      <ProductsList />
      <div className="mt-[-70px] text-center">
        <Pagination />
      </div>
    </>
  );
};

export default ProductsPage;
