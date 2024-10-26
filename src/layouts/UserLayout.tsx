import { Outlet } from "react-router-dom";
import UserSidebar from "../components/User/UserSidebar";
import NavbarComponent from "../components/utils/Navbar";

const UserLayout = () => {
  return (
    <>
      <NavbarComponent />
      <UserSidebar />
      <section className="mx-auto mt-10 max-w-screen-xl space-y-5 px-4 py-10 md:ms-[16rem] lg:px-12">
        <Outlet />
      </section>
    </>
  );
};

export default UserLayout;
