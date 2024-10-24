import { Outlet } from "react-router-dom";
import NavbarComponent from "../components/utils/Navbar";

const RootLayout = () => {
  return (
    <>
      <NavbarComponent />
      <Outlet />
    </>
  );
};

export default RootLayout;
