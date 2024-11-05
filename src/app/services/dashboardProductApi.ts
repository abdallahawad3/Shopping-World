import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { IDataResponse, IProduct } from "../../interfaces";
import CookieService from "../../services/CookieService";

const user = CookieService.get("user") ?? false;
const token = user?.token ?? "";

export const dashboardProductApi = createApi({
  reducerPath: "dashboardProducts",
  tagTypes: ["DashboardProduct"],
  baseQuery: fetchBaseQuery({
    baseUrl: "http://127.0.0.1:8000/api/v1",
  }),
  endpoints: (builder) => ({
    getDashboardProducts: builder.query<
      IDataResponse,
      { limit: number; page: number }
    >({
      query: ({ limit, page }) => {
        return {
          url: `/products?limit=${limit}&page=${page}`,
        };
      },

      providesTags: (result) =>
        result
          ? [
              ...result.data.map(({ _id }: IProduct) => ({
                type: "DashboardProduct" as const,
                id: _id,
              })),
              { type: "DashboardProduct", id: "LIST" },
            ]
          : [{ type: "DashboardProduct", id: "LIST" }],
    }),
    updateProduct: builder.mutation({
      query: ({ data, id }) => {
        return {
          url: `/products/${id}`,
          method: "PUT",
          body: data,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
      },
      onQueryStarted: async (
        { id, ...patch },
        { dispatch, queryFulfilled },
      ) => {
        const patchResult = dispatch(
          dashboardProductApi.util.updateQueryData(
            "getDashboardProducts",
            id,
            (draft) => {
              Object.assign(draft, patch);
            },
          ),
        );
        try {
          await queryFulfilled;
        } catch (error) {
          console.error("Request failed:", error);
          patchResult.undo();
        }
      },
      invalidatesTags: [{ type: "DashboardProduct", id: "LIST" }],
    }),
    addNewProduct: builder.mutation({
      query: (data) => {
        return {
          url: "/products",
          method: "POST",
          body: data,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
      },
    }),
    deleteProduct: builder.mutation({
      query: (id: string) => {
        return {
          url: `/products/${id}`,
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
      },
      invalidatesTags: [{ type: "DashboardProduct", id: "LIST" }],
    }),
  }),
});

export const {
  useGetDashboardProductsQuery,
  useAddNewProductMutation,
  useDeleteProductMutation,
  useUpdateProductMutation,
} = dashboardProductApi;
