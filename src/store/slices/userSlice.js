import { createSlice } from "@reduxjs/toolkit";

const initialState={
    userData: null,
    isAuthenticated: false,
    isLoading: true,
    error: null
};

const userSlice= createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser: (state, action)=>{
            state.userData= action.payload;
            state.isAuthenticated= true;
            state.isLoading= false;
            state.error= null;
        }, 
        clearUser: (state)=>{
            state.userData= null;
            state.isAuthenticated= false;
            state.isLoading= false;
            state.error= null;
        },
        setLoading: (state, action)=>{
            state.isLoading= action.payload;
        },
        setError: (state, action)=>{
            state.error= action.payload;
            state.isLoading= false;
        },
    }
});

export const userActions= userSlice.actions;
const userReducer= userSlice.reducer;
export default userReducer;