import { Routes, Route, Navigate } from "react-router-dom";
import LandingPage from "./views/landing/landing.screen";
import Login from "./views/auth/Login/login.component";
import Signup from "./views/auth/Signup/signup.component";
import Dashboard from "./views/dashboard/dashboard.screen";

const AppRoutes = ({ authenticated }) => {
    if (authenticated) {
        return (
            <Routes>
                <Route exact path="/" element={<Dashboard />} />
            </Routes>
        );
    }
    return (
        <Routes>
            <Route exact path="/" element={<LandingPage />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/signup" element={<Signup />} />
            {/* Redirect all unmatched routes to the homepage */}
            <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
    );
};

export default AppRoutes;