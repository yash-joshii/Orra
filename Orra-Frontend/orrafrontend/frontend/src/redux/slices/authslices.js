import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  loading: false,
  error: null,
};

const authslice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    logout: (state) => {
      state.user = null;
    },
  },
});

export const { setError, setLoading, setUser, logout } = authslice.actions;

export default authslice.reducer;