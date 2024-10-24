import Slider from "../../components/Home/Slider";
import NavbarComponent from "../../components/utils/Navbar";

const HomePage = () => {
  return (
    <>
      <NavbarComponent />
      <section className="mt-[76px]">
        <Slider />
      </section>
    </>
  );
};

export default HomePage;
