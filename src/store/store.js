import {configureStore} from "@reduxjs/toolkit";
import userSlice from "./userSlice.js";
import pinSlice from "./pinSlice.js";
import boardSlice from "./boardSlice.js";

const store = configureStore({
    reducer:{
        userReducer:userSlice.reducer,
        pinReducer:pinSlice.reducer,
        boardReducer:boardSlice.reducer
    }
})
export default store;