import { configureStore } from "@reduxjs/toolkit";
import authreducer from "./slices/authslices";
import productreducer from "./slices/productslices";
//reponse to the action and update the state
export const store = configureStore({
  reducer: {
    auth: authreducer,
    products: productreducer,
  },
});
