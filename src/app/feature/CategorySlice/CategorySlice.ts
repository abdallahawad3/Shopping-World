import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";
import type { ICategory, IErrorResponse } from "../../../interfaces";
import { axiosInstance } from "../../../config/axios.config";
import toast from "react-hot-toast";
import type { AxiosError } from "axios";

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
            Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3MTdjY2JjMjhkZWM5MTBlOTdhNGI3OSIsImlhdCI6MTcyOTYxMzE4OSwiZXhwIjoxNzM3Mzg5MTg5fQ.uI9YBy8Wv151HBa5yC5_xlcTe2ec281Y1yVGlvCwRr0`,
          },
        },
      );
      console.log(statusText);

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
      .addCase(AddCategory.fulfilled, (state) => {
        console.log(state);
      })
      .addCase(AddCategory.rejected, (_, action) => {
        const errorObj = action.payload as AxiosError<IErrorResponse>;
        const errorMsg = errorObj.response?.data.error.message;
        toast.error(`${errorMsg}`);
      });
  },
});

export default categorySlice.reducer;
