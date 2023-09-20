import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { Home } from "../Pages/Home";
import { NewRoom } from "../Pages/NewRoom";
import { Room } from "../Pages/Room/index";
import { AdminRoom } from "../Pages/AdminRoom";
import { Login } from "../Pages/Login";


import { AuthContextProvider } from '../Contexts/AuthContext';



function AppRouter() {

    return (
        <Router>
            <AuthContextProvider>
                <Routes>
                    <Route path="/home" Component={Home} />
                    <Route path="/rooms/new" Component={NewRoom} />
                    <Route path="/rooms/:id" Component={Room} />
                    <Route path="/admin/rooms/:id" Component={AdminRoom} />
                    <Route path="/" Component={Login} />
                </Routes>
            </AuthContextProvider>
        </Router>
    );
}

export default AppRouter;