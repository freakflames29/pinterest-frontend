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
        },
        setToken(state,action){
            state.user.token = action.payload.access
            // state.refresh = action.payload.refresh
        }
    }
})

export const userActions = userSlice.actions
export default userSlice