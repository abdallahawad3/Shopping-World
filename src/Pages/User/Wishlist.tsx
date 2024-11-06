import { useSelector } from "react-redux";
import { useAppDispatch, type RootState } from "../../app/store";
import ProductCard from "../../components/utils/ProductCard";
import { useEffect } from "react";
import { getWishlistData } from "../../app/feature/Wishlist/wishlistSlice";

const WishlistPage = () => {
  const data = useSelector((state: RootState) => state.wishlist.data);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getWishlistData());
  }, [dispatch]);
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 ">
      {data &&
        data.map((product) => (
          <ProductCard product={product} key={product._id} />
        ))}
    </div>
  );
};

export default WishlistPage;
