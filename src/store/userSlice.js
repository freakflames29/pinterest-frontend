import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    user:null,
    profile:null
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
        },
        // testing for refressh token expiry reload feature. TODO: delete this section code
        // polluteRefreshToken(state){
        //     state.user.token+="fdf"
        //     state.user.refresh += "ddd"
        // }

        setProfile(state,action) {
            state.profile = action.payload
        },
        clearProfile(state){
            state.profile = null
        },
        setProfileImage(state,action){
            state.profile.profile_img = action.payload
        },
        setProfileDesc(state,action){
            state.profile.desc = action.payload
        }
    }
})

export const userActions = userSlice.actions
export default userSlice