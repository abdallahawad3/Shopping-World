import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import categorySlice from "./feature/CategorySlice/CategorySlice";
import brandSlice from "./feature/Brands/brandSlice";

export const store = configureStore({
  reducer: {
    allCategory: categorySlice,
    allBrand: brandSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
