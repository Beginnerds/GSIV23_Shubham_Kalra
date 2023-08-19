import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    moviesList:[]
};

export const appSlice = createSlice({
    name:"app",
    initialState:initialState,
    reducers:{
        updateMoviesList:(state,action)=>{
            // const updatedList = Array.from(state.moviesList).push(action.payload);
            state.moviesList = action.payload;
        }
    }
})

export const {updateMoviesList} = appSlice.actions;
export default appSlice.reducer;