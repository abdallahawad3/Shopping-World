import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";
import { axiosInstance } from "../../../config/axios.config";
import type { ISubCategory } from "../../../interfaces";
import toast from "react-hot-toast";
import CookieService from "../../../services/CookieService";

interface ISubCategoryState {
  isLoading: boolean;
  data: ISubCategory;
}

const initialState: ISubCategoryState = {
  data: {
    _id: "",
    name: "",
    category: "",
  },
  isLoading: false,
};

const user = CookieService.get("user");
const token = user.token;

// Post New SubCategory..✅
export const addSubCategory = createAsyncThunk(
  "subCategory/addSubCategory",
  async (data: { name: string; category: string }, { rejectWithValue }) => {
    try {
      const { data: resData, status } = await axiosInstance.post(
        "/subcategories",
        {
          name: data.name,
          category: data.category,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (status == 201) {
        toast.success("The Sub Category Add Successully.!", {
          position: "top-right",
        });
        return resData;
      }
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

const subCategorySlice = createSlice({
  name: "subCategory",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(addSubCategory.pending, (state) => {
      state.isLoading = true;
      state.data = { _id: "", category: "", name: "" };
    });
    builder.addCase(
      addSubCategory.fulfilled,
      (state, action: PayloadAction<ISubCategoryState>) => {
        state.isLoading = false;
        state.data = action.payload.data;
      },
    ),
      builder.addCase(addSubCategory.rejected, (state, action) => {
        state.isLoading = false;
        const errorPayload = action.payload as {
          response: { data: { message: string } };
        };
        toast.error(errorPayload.response.data.message, {
          position: "top-right",
        });
      });
  },
});

export default subCategorySlice.reducer;
