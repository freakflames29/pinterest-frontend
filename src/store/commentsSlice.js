import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    comments:[]
}

const commentSlice = createSlice({
    name:"commentSlice",
    initialState:initialState,
    reducers:{
        setComments(state,action){
            state.comments = action.payload
        },
        removeComments(state){
            state.comments = []
        }

    }
})

export const commentActions = commentSlice.actions

export default commentSlice;