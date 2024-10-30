import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";
import type { IBrand } from "../../../interfaces";
import { axiosInstance } from "../../../config/axios.config";
import toast from "react-hot-toast";

interface BrandState {
  data: IBrand[];
  paginationResult: {
    currentPage: number;
    limit: number;
    numberOfPages: number;
    nextPage: number;
  };
  isLoading: boolean;
  isError: string | null;
}

const initialState: BrandState = {
  data: [],
  isLoading: true,
  isError: null,
  paginationResult: {
    currentPage: 0,
    limit: 0,
    nextPage: 0,
    numberOfPages: 0,
  },
};

// Get All Brands

export const getAllBrand = createAsyncThunk(
  "allBrand/getAllBrand",
  async (limit: number = 5, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get(`/brands?limit=${limit}`);
      return data;
    } catch (error) {
      rejectWithValue(error);
    }
  },
);

// Get Pagination Brands
export const getPaginationBrand = createAsyncThunk(
  "allBrand/getPaginationBrand",
  async (page: number, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const { data } = await axiosInstance.get(`/brands?limit=5&page=${page}`);
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

// Post New Bran

export const addBrand = createAsyncThunk(
  "allBrand/addBrand",
  async (formData: FormData, { rejectWithValue }) => {
    try {
      const { data, status } = await axiosInstance.post("/brands", formData, {
        headers: {
          Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3MTdjY2JjMjhkZWM5MTBlOTdhNGI3OSIsImlhdCI6MTczMDIyNTEzNiwiZXhwIjoxNzM4MDAxMTM2fQ.NEXWYK1nC-O-NEnlC90TGJ7ri1jPBBMqDBmY5Vbg-rY`,
        },
      });
      if (status === 201) {
        toast.success("The Brand Added Successfully", {
          position: "top-right",
        });
      }
      return data;
    } catch (error) {
      rejectWithValue(error);
    }
  },
);

const brandSlice = createSlice({
  name: "allBrand",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(getAllBrand.pending, (state) => {
      state.data = [];
      state.isLoading = true;
      state.isError = null;
    }),
      builder.addCase(
        getAllBrand.fulfilled,
        (state, action: PayloadAction<BrandState>) => {
          state.data = action.payload.data;
          state.isLoading = false;
          state.isError = null;
          state.paginationResult.numberOfPages =
            action.payload.paginationResult.numberOfPages;
        },
      ),
      builder.addCase(getPaginationBrand.pending, (state) => {
        state.data = [];
        state.isLoading = true;
      }),
      builder.addCase(
        getPaginationBrand.fulfilled,
        (state, action: PayloadAction<BrandState>) => {
          state.data = action.payload.data;
          state.paginationResult = action.payload.paginationResult;
          state.isLoading = false;
        },
      );
    builder.addCase(addBrand.pending, (state) => {
      state.isLoading = true;
    }),
      builder.addCase(addBrand.fulfilled, (state) => {
        state.isLoading = false;
      });
  },
});

export default brandSlice.reducer;
