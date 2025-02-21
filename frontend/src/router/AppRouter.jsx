import Login from "../pages/auth/Login";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Register from "../pages/auth/Register";
import Home from "../pages/home/Home";

import Profile from "../pages/profile/Profile"
import Dashboard from "../pages/dashboard/Dashboard";
import AccManager from "../components/admin/manager/AccManager";
import MatchesManager from "../components/admin/manager/MatchsManager";
import Overview from "../components/admin/manager/Overview";

function AppRouter() {
    return (
        <Router>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/profile" element={<Profile/>}/>

                <Route path="/" element={<Home />}>
                    <Route index element={<Home />} />
                    
                </Route>

                {/* admin */}

                <Route path="/admin" element={<Dashboard />}>
                    <Route index element={<Overview />} />
                    <Route path="account" element={<AccManager />} />
                    <Route path="match" element={<MatchesManager />} />
                    <Route path="logout" element={<Dashboard />} />
                </Route>
            </Routes>
        </Router>
    );
}

export default AppRouter;