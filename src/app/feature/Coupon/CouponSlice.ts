import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { ICoupon } from "../../../interfaces";
import { axiosInstance } from "../../../config/axios.config";
import CookieService from "../../../services/CookieService";

const user = CookieService.get("user") ?? false;
const token = user?.token ?? "";
interface ICouponState {
  allCoupon: ICoupon[];
}

const initialState: ICouponState = {
  allCoupon: [],
};

export const getAllCoupons = createAsyncThunk(
  "getAllCoupons",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get(`coupons`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const addNewCoupon = createAsyncThunk(
  "addNewCoupon",
  async (
    couponData: { name: string; expire: string; discount: string },
    { rejectWithValue },
  ) => {
    try {
      const { data } = await axiosInstance.post(
        `coupons`,
        {
          name: couponData.name,
          expire: couponData.expire,
          discount: couponData.discount,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

const couponSlice = createSlice({
  name: "coupon",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(getAllCoupons.fulfilled, (state, action) => {
      state.allCoupon = action.payload.data;
    });
    builder.addCase(addNewCoupon.fulfilled, (state, action) => {
      state.allCoupon = [...state.allCoupon, action.payload.data];
    });
  },
});

export default couponSlice.reducer;
