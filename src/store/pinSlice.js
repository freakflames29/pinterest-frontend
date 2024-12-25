import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    pin:null
}

const pinSlice = createSlice({
    name:"pinSlice",
    initialState,
    reducers:{
        setPin(state,action){
            state.pin = action.payload

        },
        removePin(state){
            state.pin = null
        }

    }
})

export  const pinActions = pinSlice.actions

export  default pinSlice