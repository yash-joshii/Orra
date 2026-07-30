import { createSlice } from "@reduxjs/toolkit";
// import { setError } from "./authslices";
import MyBookings from "@/pages/MyBookings";

const initialState = {
    currentBooking : null,
    MyBookings: [],
    ownerIncomingRequests: [],
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
        setOwnerIncomingRequests: (state, action) => {
            state.ownerIncomingRequests = action.payload;
        },
        setError: (state, action) => {
            state.error = action.payload;
        },
    },
});

export const {setLoading, setCurrentBooking, setError} = bookingSlice.actions;

export default bookingSlice.reducer;