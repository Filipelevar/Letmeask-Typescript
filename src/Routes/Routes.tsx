import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { Home } from "../Pages/Home";
import { NewRoom } from "../Pages/NewRoom";
import { Room } from "../Pages/Room/index";
import { AdminRoom } from "../Pages/AdminRoom";
import { Login } from "../Pages/Login";
import { Register } from "../Pages/Register";
import { PrivateRoute } from "../Guards/PrivateRoutes";
import { AuthContextProvider } from '../Contexts/AuthContext';
import { PublicRoutes } from "../Guards/PublicRoutes";





function AppRouter() {

    return (
        <Router>
            <AuthContextProvider>
                <Routes>
                    <Route path="/" element={<PublicRoutes />}>
                        <Route path="/" Component={Login} />
                        <Route path="/register" Component={Register} />
                    </Route>
                    <Route path="/admin/rooms/:id" Component={AdminRoom} />
                    <Route path="/" element={<PrivateRoute />}>
                        <Route path="/home" Component={Home} />
                        <Route path="/rooms/new" Component={NewRoom} />
                        <Route path="/rooms/:id" Component={Room} />
                    </Route>
                </Routes>
            </AuthContextProvider>
        </Router>
    );
}

export default AppRouter;