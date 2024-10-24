import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import RootLayout from "../layouts/RootLayout";
import HomePage from "../Pages/Home";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      {/* Root Layout */}
      <Route element={<RootLayout />} path="/">
        <Route index element={<HomePage />} />
      </Route>
      {/* User Layout */}
      {/* Admin Layout */}
    </>,
  ),
);

export default router;
