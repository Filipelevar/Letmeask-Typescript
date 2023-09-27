import { useContext } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { AuthContext } from "../Contexts/AuthContext";

export function PublicRoutes() {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    console.log(user)
    if (user?.id) {

        navigate(-1);

    }

    return <Outlet />;
}


