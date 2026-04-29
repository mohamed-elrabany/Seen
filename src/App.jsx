import React from "react";
import "./App.css";
import AppRoutes from "./routes/AppRoutes";

import Loading from "./components/ui/Loading";

import { getMe } from "./services/authService";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "./store/slices/userSlice";

function App() {
  const dispatch = useDispatch();
  const { setUser, clearUser, setError } = userActions;
  const theme = useSelector((state) => state.theme.theme);
  const loader = useSelector((state) => state.user.isLoading);

  useEffect(() => {
    async function checkSession() {
      const token = localStorage.getItem("token");
      if (!token) {
        dispatch(clearUser());
        return;
      }
      try {
        const data = await getMe();
        console.log("CheckSession Data:", data);
        dispatch(setUser(data.user));
        
      } catch (error) {
        console.log("No active session found.");
        localStorage.removeItem("seen-app-theme");
        dispatch(userActions.setError(error.message || "Session failed"));
        localStorage.removeItem("token");
        dispatch(clearUser());
      }
    }
    checkSession();
  }, [dispatch, setUser, clearUser]);

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }

    localStorage.setItem("seen-app-theme", theme);
  }, [theme]);

  if (loader) {
    return <Loading />;
  }

  return <AppRoutes />;
}

export default App;
