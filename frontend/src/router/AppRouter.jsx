import Login from "../pages/auth/Login";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Register from "../pages/auth/Register";
import HomePage from "../pages/Home/HomePage";

import Profile from "../pages/profile/Profile"
import IntroducePage from "../pages/IntroducePage/IntroducePage";

function AppRouter() {
    return (
        <Router>
            <Routes>
                <Route path="/login" element={<Login />} />

                <Route path="/register" element={<Register />} />
                <Route path="/profile" element={<Profile/>}/>
                <Route path="/IntroducePage" element={<IntroducePage/>}/>

                <Route path="/" element={<HomePage />}>
                    <Route index element={<HomePage />} />
                    
                </Route>
            </Routes>
        </Router>
    );
}

export default AppRouter;