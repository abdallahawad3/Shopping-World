import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { IProduct } from "../../../interfaces";
import { addItemToShoppingCart } from "../../../utils";
import { axiosInstance } from "../../../config/axios.config";
import CookieService from "../../../services/CookieService";

interface cartSliceState {
  cartProducts: IProduct[];
  existCartProduct: { product: string; _id: string }[];
  isLoading: boolean;
}

const initialState: cartSliceState = {
  cartProducts: [],
  existCartProduct: [],
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
      const { status } = await axiosInstance.delete(`cart/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(status);
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
    },
  },
  extraReducers(builder) {
    builder.addCase(addToCart.fulfilled, (state, action) => {
      state.isLoading = false;
      state.existCartProduct = [...action.payload.data.products];
    }),
      builder.addCase(deleteProductFromCart.fulfilled, (state) => {
        state.isLoading = false;
      }),
      builder.addCase(removeAllProductsCart.fulfilled, (state) => {
        state.cartProducts = [];
      }),
      builder.addCase(getAllCartProducts.fulfilled, (state, action) => {
        if (action.payload) {
          const products = action.payload.data.products.map(
            (ele: { product: IProduct; price: number }) => ({
              ...ele.product,
              price: ele.price,
            }),
          );
          state.cartProducts = [...products];
        }
      });
  },
});

export const {
  addToCartAction,
  removeFromCartAction,
  clearAllCartProductAction,
} = cartSlice.actions;
export default cartSlice.reducer;
