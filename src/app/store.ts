import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import categorySlice from "./feature/CategorySlice/CategorySlice";
import brandSlice from "./feature/Brands/brandSlice";
import subCategorySlice from "./feature/subCategorySlice/subCategorySlice";

export const store = configureStore({
  reducer: {
    allCategory: categorySlice,
    allBrand: brandSlice,
    subCategory: subCategorySlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
