import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import themeReducer from "./slices/themeSlice";
import notificationReducer from "./slices/notificationSlice";

export const store= configureStore({
    reducer:{
        user: userReducer,
        theme: themeReducer,
        notification: notificationReducer,
    }
});
