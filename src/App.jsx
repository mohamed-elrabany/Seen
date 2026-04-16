import React from "react";
import "./App.css";
import AppRoutes from './routes/AppRoutes';
import { getMe } from "./services/authService";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { userActions } from "./store/slices/userSlice";

function App() {
  const dispatch= useDispatch();
  const { setUser, clearUser }= userActions;
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

  return <AppRoutes />

}

export default App;
