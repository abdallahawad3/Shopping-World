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
      {/* Admin Layout */}
    </>,
  ),
);

export default router;
