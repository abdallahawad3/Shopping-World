import { useSelector } from "react-redux";
import type { RootState } from "../../app/store";
import ProductCard from "../../components/utils/ProductCard";

const WishlistPage = () => {
  const { wishlistProducts } = useSelector(
    (state: RootState) => state.wishlist,
  );

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 ">
      {wishlistProducts &&
        wishlistProducts.map((ele) => (
          <ProductCard product={ele} key={ele._id} />
        ))}
    </div>
  );
};

export default WishlistPage;
