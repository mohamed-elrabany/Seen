import { createSlice } from "@reduxjs/toolkit";


function getInitialTheme() {
    const savedTheme= localStorage.getItem("seen-app-theme");
    if( savedTheme ) return savedTheme;
    const systemPrefersDark= window.matchMedia("(prefers-color-scheme: dark)").matches;
    return systemPrefersDark ? "dark" : "light";
}

const themeSlice= createSlice({
    name: "theme",
    initialState:{
        theme: getInitialTheme()
    },
    reducers: {
        toggleTheme: (state)=>{
            state.theme= state.theme === 'light' ? 'dark' : 'light';
            localStorage.setItem("seen-app-theme", state.theme);
        },
        setTheme: (state, action)=>{
            state.theme= action.payload;
            localStorage.setItem("seen-app-theme", state.theme);
        }
    }
});

export const themeActions= themeSlice.actions;
const themeReducer= themeSlice.reducer;
export default themeReducer;