import HomeCategory from "../../components/Home/HomeCategory";
import CardProductsSection from "../../components/Home/CardProductsSection";
import Slider from "../../components/Home/Slider";
import Footer from "../../components/utils/Footer";
import Discount from "../../components/Home/Discount";
import BrandsSection from "../../components/Home/BrandsSection";

const HomePage = () => {
  return (
    <>
      <section className="">
        <Slider />
      </section>
      <section className="container py-10">
        <HomeCategory />
      </section>
      <section className="container py-10">
        <CardProductsSection title="Most Sales" btnTitle="Show More" />
      </section>
      <section className="container py-10">
        <CardProductsSection title="Recommended for you" btnTitle="" />
      </section>
      <section className="container py-10">
        <Discount />
      </section>
      <section className="container py-10">
        <BrandsSection title="All Brands" btnTitle="Show All Brands" />
      </section>
      <section className="container py-10">
        <CardProductsSection title="Beauty picks" btnTitle="Show More" />
      </section>
      <Footer />
    </>
  );
};

export default HomePage;
