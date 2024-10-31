import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { IDataResponse } from "../../interfaces";

export const dashboardProductApi = createApi({
  reducerPath: "dashboardProducts",
  tagTypes: ["DashboardProduct"],
  baseQuery: fetchBaseQuery({
    baseUrl: "http://127.0.0.1:8000/api/v1",
  }),
  endpoints: (builder) => ({
    getDashboardProducts: builder.query<IDataResponse, string>({
      query: (limit) => {
        return {
          url: `/products?limit=${limit}`,
        };
      },
    }),
    addNewProduct: builder.mutation({
      query: (data) => {
        return {
          url: "/products",
          method: "POST",
          body: data,
          headers: {
            Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3MTdjY2JjMjhkZWM5MTBlOTdhNGI3OSIsImlhdCI6MTcyOTYxMzE4OSwiZXhwIjoxNzM3Mzg5MTg5fQ.uI9YBy8Wv151HBa5yC5_xlcTe2ec281Y1yVGlvCwRr0`, // replace `yourJwtToken` with the actual JWT
          },
        };
      },
    }),
  }),
});

export const { useGetDashboardProductsQuery } = dashboardProductApi;
