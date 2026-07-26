import { createSlice } from "@reduxjs/toolkit";

const categorySlice = createSlice({
    name: "categories",
    initialState: {
        categories: [],
        loading: false,
        error: null,
    },

    reducers: {
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        setCategories: (state, action) => {
            state.categories = action.payload;
        },
        setError: (state, action) => {
            state.error = action.payload;
        },
    },
});

export const {setLoading, setCategories, setError} = categorySlice.actions;
export default categorySlice.reducer;