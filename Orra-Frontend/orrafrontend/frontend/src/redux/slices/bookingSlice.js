import { createSlice } from "@reduxjs/toolkit";
import { setError } from "./authslices";

const initialState = {
    currentBooking : null,
    loading : false,
    error : null 
}

const bookingSlice = createSlice({
    name: "booking",
    initialState,
    reducers: {
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        setCurrentBooking: (state, action) => {
            state.currentBooking = action.payload;
        },
        // setError: (state, action) => {
        //     state.error = action.payload;
        // },
    },
});

export const {setLoading, setCurrentBooking} = bookingSlice.actions;

export default bookingSlice.reducer;