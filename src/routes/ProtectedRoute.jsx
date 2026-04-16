import { Outlet, useLocation, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Loading from "../components/ui/Loading";


export default function ProtectedRoute(){
    const {isAuthenticated, isLoading}= useSelector((state) => state.user);
    const location= useLocation();

    if(isLoading){
        return <Loading />
    }

    if(!isAuthenticated){
        return <Navigate to={"/login"} state={{ from: location}} replace />
    }

    return <Outlet />
}

