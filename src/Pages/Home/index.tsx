import HomeCategory from "../../components/Home/HomeCategory";
import CardProductsSection from "../../components/Home/CardProductsSection";
import Slider from "../../components/Home/Slider";
import Discount from "../../components/Home/Discount";
import BrandsSection from "../../components/Home/BrandsSection";
import { useSelector } from "react-redux";
import { useAppDispatch, type RootState } from "../../app/store";
import { useEffect } from "react";
import {
  fetchBeauty,
  fetchMostSales,
  fetchRecommendForYou,
} from "../../app/feature/ProductsSlice/productsSlice";
import { getAllCartProducts } from "../../app/feature/Cart/cartSlice";

const HomePage = () => {
  const { beauty, mostSales, recommendForYou, isLoading } = useSelector(
    (state: RootState) => state.allProducts,
  );
  const { isLogin: isLoginReducer } = useSelector(
    (state: RootState) => state.auth,
  );

  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchMostSales());
    dispatch(fetchRecommendForYou());
    dispatch(fetchBeauty());
    if (isLoginReducer) {
      dispatch(getAllCartProducts());
    }
  }, [dispatch, isLoginReducer]);

  return (
    <>
      <section className="">
        <Slider />
      </section>
      <section className="container py-10">
        <HomeCategory />
      </section>
      <section className="container py-10">
        <CardProductsSection
          products={mostSales}
          isLoading={isLoading}
          title="Most Sales"
          btnTitle="Show More"
        />
      </section>
      <section className="container py-10">
        <CardProductsSection
          products={recommendForYou}
          isLoading={isLoading}
          title="Recommended for you"
          btnTitle=""
        />
      </section>
      <section className="container py-10">
        <Discount />
      </section>
      <section className="container py-10">
        <BrandsSection title="All Brands" btnTitle="Show All Brands" />
      </section>
      <section className="container py-10">
        <CardProductsSection
          products={beauty}
          isLoading={isLoading}
          title="Beauty picks"
          btnTitle="Show More"
        />
      </section>
    </>
  );
};

export default HomePage;
