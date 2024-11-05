import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";
import type { ICategory } from "../../../interfaces";
import { axiosInstance } from "../../../config/axios.config";
import toast from "react-hot-toast";
import CookieService from "../../../services/CookieService";
const user = CookieService.get("user") ?? false;
const token = user?.token ?? "";

interface CategoryState {
  data: ICategory[];
  paginationResult: {
    currentPage: number;
    limit: number;
    numberOfPages: number;
    nextPage: number;
  };
  isLoading: boolean;
  isError: string | null;
}

const initialState: CategoryState = {
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

// Fetch All Categories..✅

export const getAllCategory = createAsyncThunk(
  "allCategory/getAllCategory",
  async (limit: number = 7, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const { data } = await axiosInstance.get(`/categories?limit=${limit}`);
      return data;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : "An error occurred",
      );
    }
  },
);

// Fetch All Categories Pagination..✅
export const getPaginationCategory = createAsyncThunk(
  "allCategory/getPaginationCategory",
  async (page: number = 7, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const { data } = await axiosInstance.get(
        `/categories?limit=5&page=${page}`,
      );
      return data;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : "An error occurred",
      );
    }
  },
);

export const AddCategory = createAsyncThunk(
  "allCategory/AddCategory",
  async (formData: FormData, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;

    try {
      const { data, statusText } = await axiosInstance.post(
        "/categories",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (statusText == "Created") {
        toast.success("Your category has been added successfully!", {
          position: "top-right",
        });
      }
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

const categorySlice = createSlice({
  name: "allCategory",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(
        getAllCategory.fulfilled,
        (state, action: PayloadAction<CategoryState>) => {
          state.data = action.payload.data;
          state.paginationResult = action.payload.paginationResult;
          state.isLoading = false;
          state.isError = null;
        },
      )
      .addCase(getAllCategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload as string;
      })
      .addCase(getPaginationCategory.fulfilled, (state, action) => {
        state.data = action.payload.data;
        state.paginationResult = action.payload.paginationResult;
        state.isLoading = false;
        state.isError = null;
      })
      .addCase(AddCategory.rejected, (_, action) => {
        const errorPayload = action.payload as {
          response: { data: { message: string } };
        };
        toast.error(errorPayload.response.data.message, {
          position: "top-right",
        });
      });
  },
});

export default categorySlice.reducer;
