import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import categorySlice from "./feature/CategorySlice/CategorySlice";
import brandSlice from "./feature/Brands/brandSlice";
import subCategorySlice from "./feature/subCategorySlice/subCategorySlice";
import productSlice from "./feature/ProductsSlice/productsSlice";
import globalSlice from "./feature/Global/globalSlice";
import cartSlice from "./feature/Cart/cartSlice";
import authSlice from "./feature/Auth/AuthSlice";
import { dashboardProductApi } from "./services/dashboardProductApi";

// Configuration For persist

const persistConfiguration = {
  key: "cart",
  storage,
};

const persistedCart = persistReducer(persistConfiguration, cartSlice);

export const store = configureStore({
  reducer: {
    allProducts: productSlice,
    allCategory: categorySlice,
    allBrand: brandSlice,
    subCategory: subCategorySlice,
    globalSlice: globalSlice,
    cart: persistedCart,
    auth: authSlice,
    [dashboardProductApi.reducerPath]: dashboardProductApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(dashboardProductApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();

export const persister = persistStore(store);
