import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { IProduct } from "../../../interfaces";
import { axiosInstance } from "../../../config/axios.config";
import toast from "react-hot-toast";

interface IProductState {
  allProduct: IProduct[];
  mostSales: IProduct[];
  recommendForYou: IProduct[];
  beauty: IProduct[];
  paginationResult: {
    currentPage: number;
    limit: number;
    numberOfPages: number;
    nextPage: number;
  };
  isLoading: boolean;
  isError: null | string;
}

const initialState: IProductState = {
  allProduct: [],
  mostSales: [],
  recommendForYou: [],
  beauty: [],
  paginationResult: {
    currentPage: 0,
    limit: 0,
    nextPage: 0,
    numberOfPages: 0,
  },
  isLoading: false,
  isError: null,
};

// Thunks
export const getAllProducts = createAsyncThunk(
  "products/getAllProducts",
  async (_, { rejectWithValue }) => {
    try {
      const { data, status } = await axiosInstance.get("/products?limit=10");
      if (status === 200) {
        console.log("GET ALL DATA SUCCESS..👋👋👋");
        return data;
      }
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const fetchMostSales = createAsyncThunk(
  "products/fetchMostSales",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get("/products?sort=-sold");
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const fetchRecommendForYou = createAsyncThunk(
  "products/fetchRecommendForYou",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get(
        "/products?sort=-priceAfterDiscount",
      );
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const fetchBeauty = createAsyncThunk(
  "products/fetchBeauty",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get(
        "/products?category[in][]=671d060d7c0a1938d3dcbff2",
      );
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

// Slice
const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Get All Products
      .addCase(getAllProducts.pending, (state) => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(getAllProducts.fulfilled, (state, action) => {
        state.allProduct = action.payload.data;
        state.paginationResult = action.payload.paginationResult;
        state.isLoading = false;
      })
      .addCase(getAllProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload as string;
        toast.error(state.isError, { position: "top-right" });
      })
      // Fetch Most Sales
      .addCase(fetchMostSales.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchMostSales.fulfilled, (state, action) => {
        state.mostSales = action.payload.data;
        state.isLoading = false;
      })
      .addCase(fetchMostSales.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload as string;
        toast.error(state.isError, { position: "top-right" });
      })
      // Fetch Recommend for You
      .addCase(fetchRecommendForYou.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchRecommendForYou.fulfilled, (state, action) => {
        state.recommendForYou = action.payload.data;
        state.isLoading = false;
      })
      .addCase(fetchRecommendForYou.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload as string;
        toast.error(state.isError, { position: "top-right" });
      })
      // Fetch Beauty
      .addCase(fetchBeauty.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchBeauty.fulfilled, (state, action) => {
        state.beauty = action.payload.data;
        state.isLoading = false;
      })
      .addCase(fetchBeauty.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload as string;
        toast.error(state.isError, { position: "top-right" });
      });
  },
});

export default productSlice.reducer;
