import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { ICoupon } from "../../../interfaces";
import { axiosInstance } from "../../../config/axios.config";
import CookieService from "../../../services/CookieService";
import toast from "react-hot-toast";

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

export const updateCoupon = createAsyncThunk(
  "updateCoupon",
  async (
    couponData: { name: string; expire: string; discount: string; id: string },
    { rejectWithValue },
  ) => {
    try {
      const { status } = await axiosInstance.put(
        `coupons/${couponData.id}`,
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
      if (status == 200) {
        const { data } = await axiosInstance.get(`coupons`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        return data;
      }
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const deleteCoupon = createAsyncThunk(
  "deleteCoupon",
  async (id: string, { rejectWithValue }) => {
    try {
      const { status } = await axiosInstance.delete(`coupons/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (status == 204) {
        const { data } = await axiosInstance.get(`coupons`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        return data;
      }
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
      toast.success("Coupon added successfully. ", {
        position: "top-right",
      });
    });
    builder.addCase(deleteCoupon.fulfilled, (state, action) => {
      state.allCoupon = action.payload.data;
      toast.success("Coupon deleted successfully. ", {
        position: "top-right",
      });
    });
    builder.addCase(updateCoupon.fulfilled, (state, action) => {
      state.allCoupon = action.payload.data;
      toast.success("Coupon updated successfully. ", {
        position: "top-right",
      });
    });
    builder.addCase(addNewCoupon.rejected, (_, action) => {
      const error = action.payload as {
        response: { data: { message: string } };
      };
      toast.error(error.response.data.message, {
        position: "top-right",
      });
    });
  },
});

export default couponSlice.reducer;
