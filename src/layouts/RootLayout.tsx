import { Outlet } from "react-router-dom";
import NavbarComponent from "../components/utils/Navbar";
import Footer from "../components/utils/Footer";

const RootLayout = () => {
  return (
    <>
      <NavbarComponent />
      <Outlet />
      <Footer />
    </>
  );
};

export default RootLayout;
