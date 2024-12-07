import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosInstance } from "../../../config/axios.config";
import CookieService from "../../../services/CookieService";
import toast from "react-hot-toast";

const user = CookieService.get("user") ?? false;
const token = user?.token ?? "";

interface IAddressState {
  allAddress: { _id: string; alias: string; details: string; phone: string }[];
}

const initialState: IAddressState = {
  allAddress: [],
};

export const getAllAddresses = createAsyncThunk(
  "getAllAddresses",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get("addresses", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const addAddress = createAsyncThunk(
  "addAddress",
  async (
    add: { alias: string; details: string; phone: string },
    { rejectWithValue },
  ) => {
    try {
      const { data } = await axiosInstance.post(
        "addresses",
        {
          alias: add.alias,
          details: add.details,
          phone: add.phone,
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

export const deleteAddress = createAsyncThunk(
  "deleteAddress",
  async (id: string, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.delete(`addresses/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const updateAddress = createAsyncThunk(
  "updateAddress",
  async (
    add: { alias: string; details: string; phone: string; id: string },
    { rejectWithValue },
  ) => {
    try {
      const { status } = await axiosInstance.put(
        `addresses/${add.id}`,
        {
          alias: add.alias,
          details: add.details,
          phone: add.phone,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      if (status === 200) {
        const { data } = await axiosInstance.get("addresses", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        return data;
      }
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

const addressSlice = createSlice({
  name: "address",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(getAllAddresses.fulfilled, (state, action) => {
      state.allAddress = action.payload.data;
    });
    builder.addCase(addAddress.fulfilled, (state, action) => {
      state.allAddress = action.payload.data;
      toast.success(action.payload.message, {
        position: "top-right",
      });
    });
    builder.addCase(updateAddress.fulfilled, (state, action) => {
      state.allAddress = action.payload.data;
      toast.success("Address updated successfully", {
        position: "top-right",
      });
    });
    builder.addCase(deleteAddress.fulfilled, (state, action) => {
      state.allAddress = action.payload.data;
      toast.success(action.payload.message, {
        position: "top-right",
      });
    });
  },
});

export default addressSlice.reducer;
