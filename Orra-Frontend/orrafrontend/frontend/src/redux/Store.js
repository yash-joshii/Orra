
import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./slices/authslices";
import productReducer from "./slices/productslices";
import userProfileReducer from "./slices/userprofileSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    products: productReducer,
    userProfile: userProfileReducer,
  },
});