import {configureStore} from "@reduxjs/toolkit";
import userSlice from "./userSlice.js";
import pinSlice from "./pinSlice.js";
import boardSlice from "./boardSlice.js";
import commentSlice from "./commentsSlice.js";

const store = configureStore({
    reducer:{
        userReducer:userSlice.reducer,
        pinReducer:pinSlice.reducer,
        boardReducer:boardSlice.reducer,
        commentReducer: commentSlice.reducer,
    }
})
export default store;