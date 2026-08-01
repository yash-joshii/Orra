import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
  selectedProduct: null,
  loading: false,
  error: null,
  fetched: false,
};

const productSlice = createSlice({
  name: "products",

  initialState,

  reducers: {
    setProducts: (state, action) => {
      state.products = action.payload;
      state.fetched = true;
    },

    setSelectedProduct: (state, action) => {
      state.selectedProduct = action.payload;
    },

    clearSelectedProduct: (state) => {
      state.selectedProduct = null;
    },

    setLoading: (state, action) => {
      state.loading = action.payload;
    },

    setError: (state, action) => {
      state.error = action.payload;
    },

    clearProducts: (state) => {
      state.products = [];
      state.fetched = false;
    },
  },
});

export const {
  setProducts,
  setSelectedProduct,
  clearSelectedProduct,
  setLoading,
  setError,
  clearProducts,
} = productSlice.actions;

export default productSlice.reducer;