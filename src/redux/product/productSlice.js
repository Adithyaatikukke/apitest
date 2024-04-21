import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getAllProducts,
  getAllProductsByFilter,
  getAllProductsByStatsFilter,
} from "./productApi";

const initialState = {
  products: [] || [],
  fetching: false,
  notFound: false,
  stats: {} || {},
  page: "Dashbord",
  toggle: false,
};

export const getAllProductsAsync = createAsyncThunk(
  "get/products",
  async () => {
    const response = await getAllProducts();

    return response.data.response;
  }
);

export const getAllProductsByFilterAsync = createAsyncThunk(
  "filter/products",
  async (data) => {
    const response = await getAllProductsByFilter(data);

    return response.data.response;
  }
);

export const getAllProductsByStatsFilterAsync = createAsyncThunk(
  "filter/stats/products",
  async (data) => {
    const response = await getAllProductsByStatsFilter(data);
    return response.data.stats;
  }
);

const ProductSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setPage: (state, action) => {
      state.page = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllProductsAsync.pending, (state, action) => {
        state.fetching = true;
        state.notFound = false;
      })
      .addCase(getAllProductsAsync.fulfilled, (state, action) => {
        state.products = action.payload || [];
        state.fetching = false;
        state.notFound = false;
      })
      .addCase(getAllProductsAsync.rejected, (state, action) => {
        state.fetching = false;

        state.products = [];
        state.notFound = true;
      })
      .addCase(getAllProductsByFilterAsync.pending, (state, action) => {
        state.fetching = true;
        state.notFound = false;
      })
      .addCase(getAllProductsByFilterAsync.fulfilled, (state, action) => {
        state.products = action.payload || [];
        state.fetching = false;
        state.notFound = false;
      })
      .addCase(getAllProductsByFilterAsync.rejected, (state, action) => {
        state.products = [];
        state.notFound = true;
        state.fetching = false;
      })
      .addCase(getAllProductsByStatsFilterAsync.pending, (state, action) => {
        state.fetching = true;
        state.notFound = false;
      })
      .addCase(getAllProductsByStatsFilterAsync.fulfilled, (state, action) => {
        state.stats = action.payload;
        state.toggle = state.toggle ? false : true;
        state.fetching = false;
        state.notFound = false;
      })
      .addCase(getAllProductsByStatsFilterAsync.rejected, (state, action) => {
        state.products = [];
        state.notFound = true;
        state.fetching = false;
      });
  },
});
export const { setPage } = ProductSlice.actions;

export const products = (state) => state.product.products;
export const toggle = (state) => state.product.toggle;
export const page = (state) => state.product.page;
export const statsData = (state) => state.product.stats;
export const notFound = (state) => state.product.notFound;
export const fetching = (state) => state.product.fetching;

export default ProductSlice.reducer;
