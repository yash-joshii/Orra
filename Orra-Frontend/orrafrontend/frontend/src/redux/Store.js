import { configureStore } from "@reduxjs/toolkit";
import authreducer from "./slices/authslices";


export  const  store = configureStore({
    reducer:{
        auth: authreducer,
    },
})

