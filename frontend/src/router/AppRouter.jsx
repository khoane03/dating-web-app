import Login from "../pages/Auth/Login";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Register from "../pages/Auth/Register";
import Home from "../pages/Home/Home";

function AppRouter() {
    return (
        <Router>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />

                <Route path="/" element={<Home />}>
                    <Route index element={<Home />} />
                    
                </Route>
            </Routes>
        </Router>
    );
}

export default AppRouter;