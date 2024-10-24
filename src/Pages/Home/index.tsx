import HomeCategory from "../../components/Home/HomeCategory";
import Slider from "../../components/Home/Slider";
import NavbarComponent from "../../components/utils/Navbar";

const HomePage = () => {
  return (
    <>
      <NavbarComponent />
      <section className="mt-[76px]">
        <Slider />
      </section>
      <section className="container py-10">
        <HomeCategory />
      </section>
    </>
  );
};

export default HomePage;
