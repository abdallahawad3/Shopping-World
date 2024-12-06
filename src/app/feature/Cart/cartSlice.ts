import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { IProduct } from "../../../interfaces";
import { addItemToShoppingCart } from "../../../utils";
import { axiosInstance } from "../../../config/axios.config";
import CookieService from "../../../services/CookieService";
import toast from "react-hot-toast";

interface cartSliceState {
  cartProducts: IProduct[];
  existCartProduct: { product: string; _id: string }[];
  isLoading: boolean;
  discount: number;
  priceAfterDiscount: number;
  totalCartPrice: number;
}

const initialState: cartSliceState = {
  cartProducts: [],
  existCartProduct: [],
  totalCartPrice: 0,
  discount: 0,
  priceAfterDiscount: 0,
  isLoading: false,
};

const user = CookieService.get("user") ?? false;
const token = user?.token ?? "";

// Async thunk functions
export const addToCart = createAsyncThunk(
  "cartSlice/addToCart",
  async (id: string, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.post(
        `/cart`,
        { productId: id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      return data;
    } catch (error) {
      rejectWithValue(error);
    }
  },
);

export const deleteProductFromCart = createAsyncThunk(
  "cartSlice/deleteProductFromCart",
  async (id: string, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.delete(`cart/${id}`, {
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

export const getAllCartProducts = createAsyncThunk(
  "cartSlice/getAllCartProducts",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get("cart", {
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

export const removeAllProductsCart = createAsyncThunk(
  "cartSlice/removeAllProductsCart",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.delete(`cart`, {
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

export const updateCartQuantity = createAsyncThunk(
  "cartSlice/updateCartQuantity",
  async (
    { id, quantity }: { id: string; quantity: number },
    { rejectWithValue },
  ) => {
    try {
      const { data } = await axiosInstance.put(
        `cart/${id}`,
        {
          count: quantity,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      return data;
    } catch (error) {
      rejectWithValue(error);
    }
  },
);

export const applyCoupon = createAsyncThunk(
  "cartSlice/applyCoupon",
  async (coupon: string, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.put(
        `cart/applyCoupon`,
        {
          couponName: coupon,
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

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCartAction: (state, action) => {
      state.cartProducts = addItemToShoppingCart(
        state.cartProducts,
        action.payload,
      );
    },
    removeFromCartAction: (state, action) => {
      state.cartProducts = state.cartProducts.filter(
        (ele) => ele._id != action.payload._id,
      );
    },
    clearAllCartProductAction: (state) => {
      state.cartProducts = [];
      state.totalCartPrice = 0;
      state.priceAfterDiscount = 0;
    },
  },
  extraReducers(builder) {
    builder.addCase(addToCart.fulfilled, (state, action) => {
      state.isLoading = false;
      state.existCartProduct = [...action.payload.data.products];
    });
    builder.addCase(deleteProductFromCart.fulfilled, (state, action) => {
      state.isLoading = false;
      state.totalCartPrice = action.payload.data.totalCartPrice;
    });
    builder.addCase(removeAllProductsCart.fulfilled, (state) => {
      state.cartProducts = [];
      state.totalCartPrice = 0;
      state.priceAfterDiscount = 0;
    });
    builder.addCase(updateCartQuantity.fulfilled, (state, action) => {
      if (action.payload) {
        const products = action.payload.data.products.map(
          (ele: {
            product: IProduct;
            price: number;
            count: number;
            _id: string;
          }) => ({
            ...ele.product,
            price: ele.price,
            count: ele.count,
            _id: ele._id,
          }),
        );
        state.cartProducts = [...products];
        state.totalCartPrice = action.payload.data.totalCartPrice;
      }
    });
    builder.addCase(getAllCartProducts.fulfilled, (state, action) => {
      if (action.payload) {
        const products = action.payload.data.products.map(
          (ele: {
            product: IProduct;
            price: number;
            count: number;
            _id: string;
          }) => ({
            ...ele.product,
            price: ele.price,
            count: ele.count,
            _id: ele._id,
          }),
        );
        state.cartProducts = [...products];
        state.totalCartPrice = action.payload.data.totalCartPrice;
      }
    });
    builder.addCase(applyCoupon.fulfilled, (state, action) => {
      if (action.payload) {
        state.totalCartPrice = action.payload.data.totalCartPrice;
        state.priceAfterDiscount = action.payload.data.totalAfterDiscount;
      }
    });
    builder.addCase(applyCoupon.rejected, (_, action) => {
      const error = action.payload as {
        response: { data: { message: string } };
      };
      toast.error(error.response.data.message, {
        position: "top-right",
      });
    });
  },
});

export const {
  addToCartAction,
  removeFromCartAction,
  clearAllCartProductAction,
} = cartSlice.actions;
export default cartSlice.reducer;
