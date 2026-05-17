import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import themeReducer from "./slices/themeSlice";
import notificationReducer from "./slices/notificationSlice";
import postReducer from "./slices/postSlice";

export const store= configureStore({
    reducer:{
        user: userReducer,
        posts: postReducer,
        theme: themeReducer,
        notification: notificationReducer,
    }
});
