import {configureStore} from "@reduxjs/toolkit";
import userSlice from "./userSlice.js";
import pinSlice from "./pinSlice.js";

const store = configureStore({
    reducer:{
        userReducer:userSlice.reducer,
        pinReducer:pinSlice.reducer
    }
})
export default store;