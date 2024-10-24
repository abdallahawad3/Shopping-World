import { Navbar } from "flowbite-react";
import { FaRegHeart } from "react-icons/fa";
import { MdOutlineShoppingCart } from "react-icons/md";
import { Link } from "react-router-dom";

const NavbarComponent = () => {
  return (
    <header>
      <Navbar className="mb-1 py-5 shadow-lg">
        <Navbar.Brand as={Link} to="/">
          <img
            src="/ecommerce.svg"
            className="mr-3 h-6 sm:h-9"
            alt="Logo image"
          />
          <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
            Shopping World
          </span>
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="">
          <Link to={"/"} className="flex items-center gap-1 dark:text-white">
            Home
          </Link>
          <Link
            className="flex items-center gap-1 dark:text-white"
            to={"/cart"}
          >
            Cart
            <span className="relative">
              <MdOutlineShoppingCart size={17} />
              {/* <span className="absolute right-[-10px] top-[-7px] flex size-4 items-center justify-center rounded-full bg-blue-700">
                0
              </span> */}
            </span>
          </Link>
          <Link
            className="flex items-center gap-1 dark:text-white"
            to={"/wishlist"}
          >
            Wishlist
            <div className="relative">
              <FaRegHeart size={17} />
              {/* <span className="absolute right-[-10px] top-[-7px] flex size-4 items-center justify-center rounded-full bg-blue-700">
                0
              </span> */}
            </div>
          </Link>
          <Link
            to={"/login"}
            className="cursor-pointer rounded-md bg-blue-600 px-5 py-2"
          >
            Login
          </Link>
        </Navbar.Collapse>
      </Navbar>
    </header>
  );
};

export default NavbarComponent;
