import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import categorySlice from "./feature/CategorySlice/CategorySlice";

export const store = configureStore({
  reducer: {
    allCategory: categorySlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
