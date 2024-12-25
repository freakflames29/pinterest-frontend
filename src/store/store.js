import {configureStore} from "@reduxjs/toolkit";
import userSlice from "./userSlice.js";

const store = configureStore({
    reducer:{
        userReducer:userSlice.reducer
    }
})
export default store;