import { createSlice } from "@reduxjs/toolkit";
import type { IProduct } from "../../../interfaces";
import { addItemToShoppingCart } from "../../../utils";

interface cartSliceState {
  cartProducts: IProduct[];
  isLoading: boolean;
}

const initialState: cartSliceState = {
  cartProducts: [],
  isLoading: false,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      state.cartProducts = addItemToShoppingCart(
        state.cartProducts,
        action.payload,
      );
      //  [...state.cartProducts, action.payload];
    },
    removeFromCart: (state, action) => {
      state.cartProducts = [...action.payload];
    },
  },
  extraReducers(builder) {
    console.log(builder);
  },
});

export const { addToCart, removeFromCart } = cartSlice.actions;
export default cartSlice.reducer;
