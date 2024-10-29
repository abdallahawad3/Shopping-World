import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";
import { axiosInstance } from "../../../config/axios.config";
import type { ISubCategory } from "../../../interfaces";
import toast from "react-hot-toast";

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
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3MTdjY2JjMjhkZWM5MTBlOTdhNGI3OSIsImlhdCI6MTczMDIyNTEzNiwiZXhwIjoxNzM4MDAxMTM2fQ.NEXWYK1nC-O-NEnlC90TGJ7ri1jPBBMqDBmY5Vbg-rY",
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
