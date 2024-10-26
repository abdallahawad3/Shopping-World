import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import RootLayout from "../layouts/RootLayout";
import HomePage from "../Pages/Home";
import LoginPage from "../Pages/Auth/Login";
import RegisterPage from "../Pages/Auth/Register";
import ProtectedRoutes from "../components/Auth/ProtectedRoutes";
import CategoryPage from "../Pages/Catrgories/Category";
import ProductsPage from "../Pages/Products/Products";
import BrandsPage from "../Pages/Brands/Brands";
import ProductPage from "../Pages/Products/Product";
import CartPage from "../Pages/Cart/Cart";
import AdminLayout from "../layouts/AdminLayout";
import DashboardTable from "../components/Admin/DashboardTable";
import OrdersPage from "../Pages/Admin/Orders";
import SingleOrderPage from "../Pages/Admin/SingleOrder";
import AddBrandPage from "../Pages/Admin/AddBrand";
import AddCategoryPage from "../Pages/Admin/AddCategory";
import AddSubCategoryPage from "../Pages/Admin/AddSubCategory";
import AddProductPage from "../Pages/Admin/AddProduct";
import UserLayout from "../layouts/UserLayout";
import UserHomePage from "../Pages/User";
import AddressPage from "../Pages/User/Address";
import ProfilePage from "../components/User/ProfilePage";

const isLogged = false;

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      {/* Root Layout */}
      <Route element={<RootLayout />} path="/">
        <Route index element={<HomePage />} />
        <Route
          path="/login"
          element={
            <ProtectedRoutes isAllowed={!isLogged} redirectPath="/">
              <LoginPage />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/register"
          element={
            <ProtectedRoutes isAllowed={!isLogged} redirectPath="/">
              <RegisterPage />
            </ProtectedRoutes>
          }
        />
        <Route path="/allCategory" element={<CategoryPage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/brands" element={<BrandsPage />} />
        <Route path="/product/:id" element={<ProductPage />} />
        <Route path="/cart" element={<CartPage />} />
      </Route>
      {/* User Layout */}
      <Route path="/user" element={<UserLayout />}>
        <Route index element={<UserHomePage />} />
        <Route path="address" element={<AddressPage />} />
        <Route path="profile" element={<ProfilePage />} />
      </Route>
      {/* Admin Layout */}
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<DashboardTable />} />
        <Route path="orders" element={<OrdersPage />} />
        <Route path="order/:id" element={<SingleOrderPage />} />
        <Route path="addBrand" element={<AddBrandPage />} />
        <Route path="addCategory" element={<AddCategoryPage />} />
        <Route path="addSubCategory" element={<AddSubCategoryPage />} />
        <Route path="addProduct" element={<AddProductPage />} />
      </Route>
    </>,
  ),
);

export default router;
