import { CgProfile } from "react-icons/cg";
import { IoMdHeartEmpty } from "react-icons/io";
import { MdLocationOn, MdManageAccounts } from "react-icons/md";
import { Link } from "react-router-dom";
const UserSidebar = () => {
  return (
    <>
      <div className="bg-gray-50 antialiased dark:bg-gray-900">
        <aside className="fixed left-0 top-0 z-40 h-screen w-64 -translate-x-full border-r border-gray-200 bg-white pt-20  transition-transform md:translate-x-0 dark:border-gray-700 dark:bg-gray-800">
          <div className="h-full overflow-y-auto bg-white px-3 py-5 dark:bg-gray-800">
            <ul className="space-y-2">
              <li>
                <Link
                  to={"/user"}
                  className="group flex items-center rounded-lg p-2 text-base font-medium text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                >
                  <MdManageAccounts />
                  <span className="ml-3">Manage Orders</span>
                </Link>
              </li>
              <li>
                <Link
                  to={"/user/cart"}
                  className="group flex items-center rounded-lg p-2 text-base font-medium text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                >
                  <svg
                    className="size-5 lg:me-1"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 4h1.5L9 16m0 0h8m-8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm-8.5-3h9.25L19 7H7.312"
                    ></path>
                  </svg>
                  <span className="ml-3">My Cart</span>
                </Link>
              </li>
              <li>
                <Link
                  to={"/user/wishlist"}
                  className="group flex w-full items-center rounded-lg p-2 text-base font-medium text-gray-900 transition duration-75 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                >
                  <IoMdHeartEmpty />
                  <span className="ml-3 flex-1 whitespace-nowrap text-left">
                    My Wishlist
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  to={"/user/address"}
                  className="group flex w-full items-center rounded-lg p-2 text-base font-medium text-gray-900 transition duration-75 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                >
                  <MdLocationOn />
                  <span className="ml-3 flex-1 whitespace-nowrap text-left">
                    My Address
                  </span>
                </Link>
              </li>

              <li>
                <Link
                  to={"/user/profile"}
                  className="group flex w-full items-center rounded-lg p-2 text-base font-medium text-gray-900 transition duration-75 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                >
                  <CgProfile />
                  <span className="ml-3 flex-1 whitespace-nowrap text-left">
                    My Profile
                  </span>
                </Link>
              </li>
            </ul>
          </div>
        </aside>
      </div>
    </>
  );
};

export default UserSidebar;
