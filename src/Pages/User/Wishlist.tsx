import ProductCard from "../../components/utils/ProductCard";

const WishlistPage = () => {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 ">
      <ProductCard />
      <ProductCard />
      <ProductCard />
      <ProductCard />
      <ProductCard />
    </div>
  );
};

export default WishlistPage;
