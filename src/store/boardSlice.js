import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    boards:[]
}

const boardSlice = createSlice({
    name:"boardSlice",
    initialState,
    reducers:{
        setBoards(state,action){
            state.boards = action.payload
        },
        addBoard(state,action){
            state.boards = [...state.boards,action.payload]
        }
    }
})

export const boardActions = boardSlice.actions

export default boardSlice
