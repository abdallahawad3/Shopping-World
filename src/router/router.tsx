import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import RootLayout from "../layouts/RootLayout";
import HomePage from "../Pages/Home";
import LoginPage from "../Pages/Auth/Login";
import RegisterPage from "../Pages/Auth/Register";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      {/* Root Layout */}
      <Route element={<RootLayout />} path="/">
        <Route index element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Route>
      {/* User Layout */}
      {/* Admin Layout */}
    </>,
  ),
);

export default router;
