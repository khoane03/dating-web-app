import Login from "../pages/Auth/Login";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function AppRouter() {
    return (
        <Router>
            <Routes>
                <Route path="/login" element={<Login />} />
            </Routes>
        </Router>
    );
}

export default AppRouter;