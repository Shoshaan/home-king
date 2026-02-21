import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {mockProducts} from "../../data/mockProducts";

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    return mockProducts;
  },
);

const productsSlice = createSlice({
  name: "products",
  initialState: {
    items: [],
    selectedProduct: null,
    status: "idle",
  },
  reducers: {
    setSelectedProduct: (state, action) => {
      state.selectedProduct = action.payload;
    },
    closeModal: (state) => {
      state.selectedProduct = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.items = action.payload;
    });
  },
});

export const { setSelectedProduct, closeModal } = productsSlice.actions;
export const productsReducer = productsSlice.reducer;
