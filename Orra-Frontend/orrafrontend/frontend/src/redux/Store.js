import wishlistReducer from "./slices/wishlistSlice";
import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./slices/authslices";
import productReducer from "./slices/productslices";
import bookingreducer from "./slices/bookingSlice"
import categoryReducer from "@/redux/slices/categorySlices";
import userProfileReducer from "./slices/userprofileSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    products: productReducer,
    userProfile: userProfileReducer,
    booking: bookingreducer,
    categories: categoryReducer,
    wishlist: wishlistReducer,
  },
});