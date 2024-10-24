import HomeCategory from "../../components/Home/HomeCategory";
import CardProductsSection from "../../components/Home/CardProductsSection";
import Slider from "../../components/Home/Slider";
import NavbarComponent from "../../components/utils/Navbar";
import Footer from "../../components/utils/Footer";
import Discount from "../../components/Home/Discount";

const HomePage = () => {
  return (
    <>
      <NavbarComponent />
      <section className="">
        <Slider />
      </section>
      <section className="container py-10">
        <HomeCategory />
      </section>
      <section className="container py-10">
        <CardProductsSection title="Most Sales" btnTitle="Show More" />
      </section>
      <section className="container">
        <Discount />
      </section>
      <section className="container py-10">
        <CardProductsSection title="Beauty picks" btnTitle="Show More" />
      </section>
      <Footer />
    </>
  );
};

export default HomePage;
