import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";import { ThemeProvider } from "../../../../React/task_management/src/context/ThemeContext";
import themeReducer from "./slices/themeSlice";

export const store= configureStore({
    reducer:{
        user: userReducer,
        theme: themeReducer
    }
});
