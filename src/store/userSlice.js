import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    user:null
}
const userSlice = createSlice({
    name:"userslice",
    initialState:initialState,
    reducers:{
        setUser(state,action){
            state.user = action.payload
        },
        removeUser(state){
            state.user = null
        }
    }
})

export const userActions = userSlice.actions
export default userSlice