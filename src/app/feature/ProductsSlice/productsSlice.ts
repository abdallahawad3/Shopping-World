import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { IProduct } from "../../../interfaces";
import { axiosInstance } from "../../../config/axios.config";
import toast from "react-hot-toast";

interface IProductState {
  singleProduct: IProduct;
  productsCategory: IProduct[];
  allProduct: IProduct[];
  mostSales: IProduct[];
  recommendForYou: IProduct[];
  flitteredProducts: IProduct[];
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
  productsCategory: [],
  flitteredProducts: [],
  singleProduct: {
    _id: "",
    title: "",
    slug: "",
    description: "",
    quantity: 0,
    sold: 0,
    price: 0,
    priceAfterDiscount: 0,
    availableColors: [""],
    imageCover: "",
    images: [""],
    category: "",
    subcategory: [""],
    ratingsQuantity: 0,
  },
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
  async (page: number, { rejectWithValue }) => {
    try {
      const { data, status } = await axiosInstance.get(
        `/products?limit=8&page=${page}`,
      );
      if (status === 200) {
        return data;
      }
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const getSingleProduct = createAsyncThunk(
  "products/getSingleProduct",
  async (id: string, { rejectWithValue }) => {
    try {
      const { data, status } = await axiosInstance.get(`/products/${id}`);
      if (status === 200) {
        return data;
      }
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const getProductsWithCategory = createAsyncThunk(
  "products/getProductsWithCategory",
  async (id: string, { rejectWithValue }) => {
    try {
      const { data, status } = await axiosInstance.get(
        `/products/?category[in][]=${id}`,
      );
      if (status === 200) {
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

export const filterProducts = createAsyncThunk(
  "products/filterProducts",
  async (
    { filter, page }: { filter: string; page: number },
    { rejectWithValue },
  ) => {
    try {
      const { data } = await axiosInstance(
        `/products?page=${page}&limit=${8}&${filter}`,
      );
      return data;
    } catch (error) {
      rejectWithValue(error);
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
      })
      // Fetch Single Product
      .addCase(getSingleProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getSingleProduct.fulfilled, (state, action) => {
        state.singleProduct = action.payload.data;
        state.isLoading = false;
      })
      .addCase(getSingleProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload as string;
        toast.error(state.isError, { position: "top-right" });
      })
      // Products in same category
      .addCase(getProductsWithCategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getProductsWithCategory.fulfilled, (state, action) => {
        state.productsCategory = action.payload.data;
        state.isLoading = false;
      })
      .addCase(getProductsWithCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload as string;
        toast.error(state.isError, { position: "top-right" });
      })
      // Filter Products
      .addCase(filterProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(filterProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.flitteredProducts = action.payload.data;
        state.paginationResult = action.payload.paginationResult;
      })
      .addCase(filterProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload as string;
        toast.error(state.isError, { position: "top-right" });
      });
  },
});

export default productSlice.reducer;
