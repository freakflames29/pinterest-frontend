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
        },
        addComments(state,action){
            state.comments = [...state.comments,action.payload]
        }

    }
})

export const commentActions = commentSlice.actions

export default commentSlice;