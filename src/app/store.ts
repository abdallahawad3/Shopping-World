import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import categorySlice from "./feature/CategorySlice/CategorySlice";
import brandSlice from "./feature/Brands/brandSlice";
import subCategorySlice from "./feature/subCategorySlice/subCategorySlice";
import productSlice from "./feature/ProductsSlice/productsSlice";
import wishlistSlice from "./feature/Wishlist/wishlistSlice";
import { dashboardProductApi } from "./services/dashboardProductApi";

export const store = configureStore({
  reducer: {
    allProducts: productSlice,
    allCategory: categorySlice,
    allBrand: brandSlice,
    subCategory: subCategorySlice,
    wishlist: wishlistSlice,
    [dashboardProductApi.reducerPath]: dashboardProductApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(dashboardProductApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
