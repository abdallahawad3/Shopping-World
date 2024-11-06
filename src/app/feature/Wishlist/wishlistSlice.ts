import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { IProduct } from "../../../interfaces";
import { axiosInstance } from "../../../config/axios.config";
import CookieService from "../../../services/CookieService";
import toast from "react-hot-toast";

interface WishlistState {
  data: IProduct[];
  isLoading: boolean;
}

const initialState: WishlistState = {
  data: [],
  isLoading: false,
};

const user = CookieService.get("user") ?? false;
const token = user?.token ?? "";

// Add Product To Wishlist
export const addProductToWishlist = createAsyncThunk(
  "wishlist/addProductToWishlist",
  async (id: string, { rejectWithValue }) => {
    try {
      const { data, status } = await axiosInstance.post(
        `/wishlist`,
        { productId: id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      if (status === 200) {
        toast.success("The product added to wishlist successfully", {
          position: "top-right",
        });
        return data; // Return the new product added
      }
    } catch (error) {
      console.error(error);
      return rejectWithValue(error);
    }
  },
);

// GET USER WISHLIST DATA
export const getWishlistData = createAsyncThunk(
  "wishlist/getWishlistData",
  async (_, { rejectWithValue }) => {
    try {
      const { data, status } = await axiosInstance.get(`/wishlist`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (status === 200) {
        return data; // Return the wishlist data
      }
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

// Delete Product From Wishlist
export const deleteProductFromWishlist = createAsyncThunk(
  "wishlist/deleteProductFromWishlist",
  async (id: string, { rejectWithValue }) => {
    try {
      const { status } = await axiosInstance.delete(`/wishlist/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (status === 200) {
        toast.success("The product removed from wishlist!", {
          position: "top-right",
        });
        return id; // Return the ID of the deleted product
      }
    } catch (error) {
      console.error(error);
      return rejectWithValue(error);
    }
  },
);

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(addProductToWishlist.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addProductToWishlist.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data.push(action.payload); // Add new product to the wishlist
      })
      .addCase(addProductToWishlist.rejected, (state, action) => {
        state.isLoading = false;
        console.error(action.payload);
      })
      .addCase(getWishlistData.pending, (state) => {
        state.isLoading = true; // Set loading for fetching data
      })
      .addCase(getWishlistData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload.data; // Update wishlist with fetched data
      })
      .addCase(getWishlistData.rejected, (state, action) => {
        state.isLoading = false;
        console.error(action.payload);
      })
      .addCase(deleteProductFromWishlist.pending, (state) => {
        state.isLoading = true; // Set loading for deletion
      })
      .addCase(deleteProductFromWishlist.fulfilled, (state, action) => {
        state.isLoading = false;
        // Remove deleted product from the wishlist
        state.data = state.data.filter((item) => item._id !== action.payload);
      })
      .addCase(deleteProductFromWishlist.rejected, (state, action) => {
        state.isLoading = false;
        console.error(action.payload);
      });
  },
});

export default wishlistSlice.reducer;

// import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import type { IProduct } from "../../../interfaces";
// import { axiosInstance } from "../../../config/axios.config";
// import CookieService from "../../../services/CookieService";
// import toast from "react-hot-toast";

// interface wishlistState {
//   data: IProduct[];
//   isLoading: boolean;
// }

// const initialState: wishlistState = {
//   data: [],
//   isLoading: false,
// };

// const user = CookieService.get("user") ?? false;
// const token = user?.token ?? "";

// // Add Product To wishlist
// export const addProductToWishlist = createAsyncThunk(
//   "wishlist/addProductToWishlist",
//   async (id: string, { rejectWithValue }) => {
//     try {
//       const { data, status } = await axiosInstance.post(
//         `/wishlist`,
//         {
//           productId: id,
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         },
//       );
//       if (status === 200) {
//         toast.success("The product added to wishlist successfully", {
//           position: "top-right",
//         });
//         return data;
//       }
//     } catch (error) {
//       console.log(error);

//       rejectWithValue(error);
//     }
//   },
// );

// // GET USER WISHLIST DATA
// export const getWishlistData = createAsyncThunk(
//   "wishlist/getWishlistData",
//   async (_, { rejectWithValue }) => {
//     try {
//       const { data, status } = await axiosInstance.get(`/wishlist`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       if (status === 200) {
//         return data;
//       }
//     } catch (error) {
//       rejectWithValue(error);
//     }
//   },
// );

// export const deleteProductFromWishlist = createAsyncThunk(
//   "wishlist/deleteProductFromWishlist",
//   async (id: string, { rejectWithValue }) => {
//     try {
//       const { status } = await axiosInstance.delete(`/wishlist/${id}`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       if (status === 200) {
//         toast.success("The product removed from wishlist.!", {
//           position: "top-right",
//         });
//       }
//     } catch (error) {
//       rejectWithValue(error);
//     }
//   },
// );

// const wishlistSlice = createSlice({
//   name: "wishlist",
//   initialState,
//   reducers: {},
//   extraReducers(builder) {
//     builder.addCase(addProductToWishlist.pending, (state) => {
//       state.isLoading = true;
//       state.data = [];
//     }),
//       builder.addCase(addProductToWishlist.fulfilled, (state) => {
//         state.isLoading = false;
//       }),
//       builder.addCase(addProductToWishlist.rejected, (state, action) => {
//         state.isLoading = false;
//         console.log(action.payload);
//       }),
//       builder.addCase(getWishlistData.fulfilled, (state, action) => {
//         state.isLoading = false;
//         state.data = action.payload.data;
//       });
//   },
// });

// export default wishlistSlice.reducer;
