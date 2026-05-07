import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  notifications: [],
  isEnabled: true,
  isLoading: false,
  error: null,
};

const notificationSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    setNotifications: (state, action) => {
      state.notifications = action.payload;
      state.isLoading = false;
      state.error = null;
    },
    addNotification: (state, action) => {
      // action.payload would be the new notification object
      state.notifications.unshift(action.payload);
    },
    removeNotification: (state, action) => {
      // action.payload would be the id of the notification to remove
      state.notifications = state.notifications.filter(
        (n) => n.id !== action.payload,
      );
    },
    markAsRead: (state, action) => {
      const index = state.notifications.findIndex(
        (n) => n.id === action.payload,
      );
      if (index !== -1) {
        state.notifications[index].isRead = true;
      }
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload; // expects boolean
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    toggleEnabled: (state) => {
      state.isEnabled = !state.isEnabled;
    },
    clearAll: (state) => {
      state.notifications = [];
    },
  },
});

export const notificationActions = notificationSlice.actions;
const notificationReducer = notificationSlice.reducer;
export default notificationReducer;
