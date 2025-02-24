import Login from "../pages/auth/Login";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Register from "../pages/auth/Register";
import HomePage from "../pages/Home/HomePage";

import Profile from "../pages/profile/Profile"
import Dashboard from "../pages/dashboard/Dashboard";
import AccManager from "../components/admin/manager/AccManager";
import MatchesManager from "../components/admin/manager/MatchsManager";
import Overview from "../components/admin/manager/Overview";
import NotFound from "../components/404/NotFound";
import Tinder from "../components/card/Tinder";
import IntroducePage from "../pages/IntroducePage/IntroducePage";
import ListChat from "../components/chat/ListChat";
import Search from "../components/search/Search";


function AppRouter() {
    return (
        <Router>
            <Routes>
                <Route path="*" element={<NotFound />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/intro" element={<IntroducePage/>}/>

                <Route path="/" element={<HomePage />}>
                    <Route index element={<Tinder />} />
                    <Route path="profile" element={<Profile/>}/>
                    <Route path="search" element={<Search />} />
                    <Route path="chat" element={<ListChat />} />
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