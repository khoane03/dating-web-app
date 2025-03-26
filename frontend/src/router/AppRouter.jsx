import Login from "../pages/auth/Login";
import {
    BrowserRouter as Router,
    Route,
    Routes
} from "react-router-dom";
import Register from "../pages/auth/Register";
import HomePage from "../pages/Home/HomePage";

import Profile from "../pages/profile/Profile";
import Dashboard from "../pages/dashboard/Dashboard";
import AccManager from "../components/admin/manager/AccManager";
import MatchesManager from "../components/admin/manager/MatchsManager";
import Overview from "../components/admin/manager/Overview";
import NotFound from "../components/404/NotFound";
import Tinder from "../components/card/Tinder";
import IntroducePage from "../pages/IntroducePage/IntroducePage";
import ListChat from "../components/chat/ListChat";
import SearchInfo from "../components/search/SearchInfo";
import Forgot from "../pages/auth/Forgot";
import AuthForm from "../pages/auth/AuthForm";
import AdminLogin from "../components/admin/login/AdminLogin";
import Info from "../components/admin/manager/Info";
import NoPermission from "../components/permission/NoPermission";
import AddImages from "../components/addImages/AddImages";
import Notifi from "../components/notification/Notifi";



function AppRouter() {
    return (
        <Router>
            <Routes>
                <Route path="*" element={<NotFound />} />
                <Route path="/no-permission" element={<NoPermission />} />

                <Route path="/auth" element={<AuthForm />}>
                    <Route index element={<Login />} />
                    <Route path="forgot" element={<Forgot />} />
                    <Route path="register" element={<Register />} />
                </Route>


                <Route path="/intro" element={<IntroducePage />} />

                <Route path="/" element={<HomePage />}>
                    <Route index element={<Tinder />} />
                    <Route path="profile" element={<Profile />} />
                    <Route path="search" element={<SearchInfo />} />
                    <Route path="search/:id" element={<SearchInfo />} />
                    <Route path="profile/:id" element={<Profile />} />
                    <Route path="chat/:id" element={<ListChat />} />
                    <Route path="chat" element={<ListChat />} />
                    <Route path="add" element={<AddImages/>} />
                    <Route path="notification" element={<Notifi/>}/>
                </Route>



                {/* admin */}
                <Route path="/admin/login" element={<AdminLogin />} />
                <Route path="/admin" element={<Dashboard />}>
                    <Route index element={<Overview />} />
                    <Route path="account" element={<AccManager />} />
                    <Route path="match" element={<MatchesManager />} />
                    <Route path="info" element={<Info/>}/>
                    <Route path="logout" element={<Dashboard />} />
                </Route>
            </Routes>
        </Router>
    );
}

export default AppRouter;