import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    allPin:[],
    singlePin:null,
}

const pinSlice = createSlice({
    name:"pinSlice",
    initialState,
    reducers:{
        setAllPin(state,action){
            state.allPin =[...action.payload]

        },
        removeAllPin(state){
            state.allPin = null;
        },

        setSinglePin(state,action){
            state.singlePin = action.payload

        },
        addPinToAllPin(state,action){
            state.allPin = [...state.allPin,action.payload]
        },
        removeSinglePin(state){

            state.singlePin = null
        }

    }
})

export  const pinActions = pinSlice.actions

export  default pinSlice