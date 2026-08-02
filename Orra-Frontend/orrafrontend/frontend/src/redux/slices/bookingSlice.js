import { createSlice } from "@reduxjs/toolkit";
// import { setError } from "./authslices";
// import myBookings from "@/pages/MyBookings";

const initialState = {
    currentBooking : null,
    myBookings: [],
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
        setMyBookings: (state, action) => {
            state.myBookings = action.payload;
        },
        setError: (state, action) => {
            state.error = action.payload;
        },
    },
});

export const {setLoading, setCurrentBooking, setMyBookings, setOwnerIncomingRequests, setError} = bookingSlice.actions;

export default bookingSlice.reducer;