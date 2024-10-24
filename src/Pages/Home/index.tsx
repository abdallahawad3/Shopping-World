import HomeCategory from "../../components/Home/HomeCategory";
import MostSeals from "../../components/Home/MostSeals";
import Slider from "../../components/Home/Slider";
import NavbarComponent from "../../components/utils/Navbar";

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
        <MostSeals />
      </section>
    </>
  );
};

export default HomePage;
