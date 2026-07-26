import { configureStore } from "@reduxjs/toolkit";
import authreducer from "./slices/authslices";
import productreducer from "./slices/productslices";
import bookingreducer from "./slices/bookingSlice"
import categoryReducer from "@/redux/slices/categorySlices";
//reponse to the action and update the state
export const store = configureStore({
  reducer: {
    auth: authreducer,
    products: productreducer,
    booking: bookingreducer,
    categories: categoryReducer,
  },
});
