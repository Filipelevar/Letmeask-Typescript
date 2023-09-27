// import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
// import { AuthContext } from "../Contexts/AuthContext";



export function PrivateRoute() {


    //    const { user } = useContext(AuthContext)
    const userLocal = localStorage.getItem('userStorage')

    if (!userLocal) {


        return (
            <Navigate to={'/'} replace />
        )
    }

    return (
        <Outlet />
    );

}