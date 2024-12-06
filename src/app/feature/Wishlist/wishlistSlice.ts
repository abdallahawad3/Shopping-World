import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { IProduct } from "../../../interfaces";
// import toast from "react-hot-toast";
import { axiosInstance } from "../../../config/axios.config";
import CookieService from "../../../services/CookieService";
import toast from "react-hot-toast";

interface IWishlistState {
  wishlistProducts: IProduct[];
}

const initialState: IWishlistState = {
  wishlistProducts: [],
};
const user = CookieService.get("user") ?? false;
const token = user?.token ?? "";

export const addToWishList = createAsyncThunk(
  "toggleWishlist",
  async (id: string, { rejectWithValue }) => {
    try {
      const { status } = await axiosInstance.post(
        `wishlist`,
        {
          productId: id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      if (status == 200) {
        const { data } = await axiosInstance.get("wishlist", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        return data;
      }
    } catch (error) {
      rejectWithValue(error);
    }
  },
);

export const removeFromWishList = createAsyncThunk(
  "removeFromWishList",
  async (id: string, { rejectWithValue }) => {
    try {
      const { status } = await axiosInstance.delete(`wishlist/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (status == 200) {
        const { data } = await axiosInstance.get("wishlist", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        return data;
      }
    } catch (error) {
      rejectWithValue(error);
    }
  },
);

export const getAllWishlistProducts = createAsyncThunk(
  "getAllWishlistProducts",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get("wishlist", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return data;
    } catch (error) {
      rejectWithValue(error);
    }
  },
);

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(getAllWishlistProducts.fulfilled, (state, action) => {
      state.wishlistProducts = action.payload.data;
    });
    builder.addCase(addToWishList.fulfilled, (state, action) => {
      state.wishlistProducts = action.payload.data;
      toast.success("Product added to wishlist!", {
        position: "top-right",
      });
    });
    builder.addCase(removeFromWishList.fulfilled, (state, action) => {
      state.wishlistProducts = action.payload.data;
      toast.success("Product removed from wishlist!", {
        position: "top-right",
      });
    });
  },
});

export default wishlistSlice.reducer;
