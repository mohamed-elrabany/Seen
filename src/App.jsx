import React from "react";
import "./App.css";
import AppRoutes from './routes/AppRoutes';
import { getMe } from "./services/authService";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "./store/slices/userSlice";
// import { themeActions } from "./store/slices/themeSlice";

function App() {
  const dispatch= useDispatch();
  const { setUser, clearUser }= userActions;
  const theme= useSelector(state=> state.theme.theme);


  useEffect(()=>{
    async function checkSession(){
      try{
        const user= await getMe();
        dispatch(setUser(user));
      }catch{
        dispatch(clearUser()); // cookie expired or invalid
      }
    }
    checkSession();
  },[dispatch, setUser, clearUser]);


  useEffect(()=>{
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }

    localStorage.setItem("seen-app-theme", theme);
  },[theme])

  return <AppRoutes />

}

export default App;
