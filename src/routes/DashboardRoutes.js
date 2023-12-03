import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from "../pages/home/home.component";
import { useAuth } from "../context/auth.context";
import ExplorePage from "../pages/explore/explore.component";

const DashboardRoutes = () => {
    const { isAuthenticated } = useAuth();
    console.log("isAuthenticated: ", isAuthenticated);
    return (
        <Routes>
            <Route path="/home" element={<HomePage />} />
            <Route path="/explore" element={<ExplorePage />} />
            {/* <Route path="/bookmarks" element={<BookmarksPage />} />
            <Route path="/notifications" element={<NotificationsPage />} />
            <Route path="/messages" element={<MessagesPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/groups" element={<GroupsPage />} /> */}

            {/* Redirect all unmatched routes to the homepage */}
            <Route path="*" element={<Navigate to="/" replace />} />
            <Route path="/" element={
                isAuthenticated ?
                    <Navigate to="/home" replace /> :
                    <Navigate to="/" replace />} />
        </Routes>
    );
};

export default DashboardRoutes;